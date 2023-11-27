import { FastifyReply, FastifyRequest } from "fastify";
import APIError from "../exceptions/APIError";
import { findToken, validateToken } from "../services/token-service/TokenService";
import { app } from "../server";
import { FastifyRedis } from "@fastify/redis";
import { JWT } from "@fastify/jwt";

/**
 * 
 * @param {FastifyRequest} req 
 * @param {FastifyReply} rep 
 * @param {Function} done 
 * @returns {void}
 */

export default async function(req:FastifyRequest<AuthReqData>, rep:FastifyReply, done:Function){
    try {
        const authorizationHeader = req.headers.authorization
        const deviceID = req.headers.deviceid
        if(!authorizationHeader) throw Error('un-auth')
        if(!deviceID) throw Error('bad-req')

        const accessToken = authorizationHeader.split(' ')[1]
        if(!accessToken) throw Error('un-auth')

        const jwt:JWT = app.jwt
        const redis:FastifyRedis = app.redis

        const symmetricKey = await redis.get(deviceID)
        if(!symmetricKey) throw Error('un-auth')

        const departmentData:DepartmentDTOI | null = await validateToken(accessToken, jwt, JSON.parse(symmetricKey))
        if(!departmentData) throw Error('un-auth')
        
        const tokenFromDb = await findToken(departmentData.id, redis)
        if(!tokenFromDb) throw Error('un-auth')        

        req.user = departmentData
    } catch (error) {
        return APIError(error as Error, rep, req)
    }
}