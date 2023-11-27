import { FastifyReply, FastifyRequest } from "fastify";
import APIError from "../exceptions/APIError";
import { encryptData } from "../utils/encryptData";

export default async function(req:FastifyRequest, rep:FastifyReply, payload:string){
    try {
        
        if(req.url === '/api/handshake') return        
        if( typeof payload !== "string" ) return        
        if( payload.startsWith('<!-- HTML') ) return
        if(!IsJsonString(payload)) return
        
        const payloadData = JSON.parse(payload)
        
        if( !payloadData.data ) return
       
        const responseEncryptedData = await encryptData(req.symmetricKey, payloadData.data);
    
        payloadData.data = responseEncryptedData
        payload = JSON.stringify(payloadData);
        return payload
    } catch (error) {
        APIError(error as Error, rep, req)
    }
}

function IsJsonString(str:string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}