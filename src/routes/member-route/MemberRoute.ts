import { 
    FastifyInstance, 
    FastifyPluginOptions, 
    FastifyPluginAsync 
} from 'fastify';
import fp from 'fastify-plugin';
import APIError from '../../exceptions/APIError';
// import {  } from './schemas';
import authMiddleware from '../../middleware/authMiddleware';
import adminMiddleware from '../../middleware/adminMiddleware';
import { AddMemberSchema, DeleteMemberSchema, EditMemberSchema, GetMemberSchema } from './schemas';

const MemberRoutes: FastifyPluginAsync = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    //TODO:
    fastify.post<RouteWithAuth<ReqData<AddMember>>>('/api/v1/members/add', { schema: AddMemberSchema, preHandler: [authMiddleware, adminMiddleware] }, async (req, rep) => {
        try {

            const member = req.body.data

        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

    //TODO:
    fastify.put<RouteWithAuth<ReqData<EditMember>>>('/api/v1/members/edit', { schema: EditMemberSchema, preHandler: [authMiddleware, adminMiddleware] }, async (req, rep) => {
        try {

            const member = req.body.data

        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

    //TODO:
    fastify.delete<RouteWithAuth<ReqData<DeleteMember>>>('/api/v1/members/delete', { schema: DeleteMemberSchema, preHandler: [authMiddleware, adminMiddleware] }, async (req, rep) => {
        try {

            const member = req.body.data

        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

    //TODO:
    fastify.get<AuthReqData>('/api/v1/members/get-members', { schema: GetMemberSchema, preHandler: [authMiddleware, adminMiddleware] }, async (req, rep) => {
        try {

        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

}

export default fp(MemberRoutes);