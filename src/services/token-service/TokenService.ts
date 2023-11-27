import { Schema } from "mongoose"
import { FastifyRedis } from '@fastify/redis'
import { JWT } from "@fastify/jwt"
import { encryptData } from "../../utils/encryptData"
import { decryptData } from "../../utils/decryptData"

export async function generateTokens(payload:DepartmentDTOI, jwt:JWT, deviceSymmetricKey:string){
    const accessToken = await jwt.sign(payload, { expiresIn: '1h' })
    const refreshToken = await jwt.sign(payload, {expiresIn: '5d'})

    const encryptedRefreshToken = await encryptData(JSON.stringify(payload.localKey), refreshToken)
    const encryptedAccessToken = await encryptData(deviceSymmetricKey, accessToken)

    return {
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken
    }
}

export async function saveToken(departmentID:Schema.Types.ObjectId, refreshToken:string, redis:FastifyRedis){
    const tokenData = await redis.set(`${departmentID}-rToken`, refreshToken, 'EX', 5*24*60*60)
    return tokenData
}

export async function removeToken(departmentID:Schema.Types.ObjectId, redis:FastifyRedis) {    
    const tokenData = await redis.del(`${departmentID}-rToken`)
    return tokenData
}

export async function validateToken(token:string, jwt:JWT, symmetricKey:SymmetricKey):Promise<DepartmentDTOI | null> { // Refresh & Access
    try {
        const decryptedToken = await decryptData(JSON.stringify(symmetricKey), token)

        const userData:DepartmentDTOI = await jwt.verify(decryptedToken)
        return userData
    } catch (error) {
        return null
    }
}

export async function findToken(departmentID:Schema.Types.ObjectId, redis:FastifyRedis) {
    const tokenData = await redis.get(`${departmentID}-rToken`)
    return tokenData
}