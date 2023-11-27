import { DepartmentModel } from '../../models/department/DepartmentModel';
import { findToken, generateTokens, removeToken, saveToken, validateToken } from "../token-service/TokenService";
import { FastifyRedis } from '@fastify/redis'
import { Schema } from "mongoose";
import { JWT } from "@fastify/jwt";
import DepartmentDTO from '../../dtos/DepartmentDTO';

export async function login(loginData:DepartmentLogin, jwt:JWT, redis:FastifyRedis, deviceID:string){

    const department = await DepartmentModel.findOne({ 'auth.login': loginData.auth.login })
    if(!department) throw Error('user-not-found')

    const isPasswordEquals = await department.comparePasswords(department.auth.password, loginData.auth.password)
    if(!isPasswordEquals) throw Error('pwd-wrong')
    
    const preparedDepartmentData = await prepareFullDepartmentData({ department, type: 'personal' }, jwt, redis, deviceID)

    return preparedDepartmentData

}

export async function logout(departmentID:Schema.Types.ObjectId, redis:FastifyRedis) {
    const token = await removeToken(departmentID, redis)
    return token
}

export async function refresh(refreshToken:string, departmentID:Schema.Types.ObjectId, jwt:JWT, redis:FastifyRedis, deviceID:string) {
    
    if(!refreshToken) throw Error('un-auth')

    const departmentFromDb = await DepartmentModel.findById(departmentID)

    if(!departmentFromDb) throw Error('user-not-found')

    const departmentData = await validateToken(refreshToken, jwt, departmentFromDb.localKey)
    const tokenFromDb = await findToken(departmentID, redis)

    if(!departmentData || !tokenFromDb) throw Error('un-auth')

    const department = await DepartmentModel.findById(departmentID)
    
    const preparedDepartmentData = await prepareFullDepartmentData({ department: department as DepartmentI, type: 'personal' }, jwt, redis, deviceID)

    return preparedDepartmentData
}

async function prepareFullDepartmentData(departmentData:DepartmentData, jwt:JWT, redis:FastifyRedis, deviceID:string){
    const departmentDTO = DepartmentDTO(departmentData.department, departmentData.type)

    const deviceSymmetricKey = await redis.get(deviceID)
    if(!deviceSymmetricKey) throw Error('un-auth')

    const tokens = await generateTokens({...departmentDTO}, jwt, deviceSymmetricKey)
    const savingToken = await saveToken(departmentDTO.id, tokens.refreshToken, redis)

    return {
        ...tokens,
        department: departmentDTO,
        savingToken
    }
}