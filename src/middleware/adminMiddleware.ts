import { FastifyReply, FastifyRequest } from "fastify";
import APIError from "../exceptions/APIError";
import { checkIsAdmin } from "../services/admin-service/AdminService";

export default async function(req:FastifyRequest<AuthReqData>, rep:FastifyReply, done:Function){
    try {
        const isAdmin = await checkIsAdmin(req.department as DepartmentDTOI)

        if(!isAdmin) throw Error('no-access')
    } catch (error) {
        return APIError(error as Error, rep, req)
    }
}