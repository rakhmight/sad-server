import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../server";
import APIError from "../exceptions/APIError";
import { decryptData } from "../utils/decryptData";
import dataFormatter from "../utils/dataFormatter";

export default async function(req:FastifyRequest<{Body:{ data: string }}>, rep:FastifyReply){
    try {        
        if(req.body && req.url!=='/api/handshake'){
            const { redis } = app
            const deviceID = req.headers.deviceid
    
            // if(!deviceID) throw Error('bad-req')
    
            const deviceData = await redis.get(deviceID)
    
            if(!deviceData) throw Error('locked')
            
            // deviceData add to req.body.data for crypt response in route
            req.symmetricKey = deviceData
    
            // data decryption
            const decryptedData = await decryptData(deviceData, req.body.data)
    
            // req.body.data replace
            req.body.data = JSON.parse(decryptedData)
            req.log.info({ data: dataFormatter(JSON.parse(decryptedData)), deviceID }, 'Deciphered request body')
        }
        
    } catch (error) {
        APIError(error as Error, rep, req)
    }
}