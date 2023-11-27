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
import { AddOrderSchema, DeleteOrderSchema, EditOrderSchema, GetOrderSchema } from './schemas';

const OrderRoutes: FastifyPluginAsync = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    //TODO:
    fastify.post<RouteWithAuth<ReqData<AddOrder>>>('/api/v1/orders/add', { schema: AddOrderSchema, preHandler: [authMiddleware, adminMiddleware] }, async (req, rep) => {
        try {

            const order = req.body.data

        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

    //TODO:
    fastify.put<RouteWithAuth<ReqData<EditOrder>>>('/api/v1/orders/edit', { schema: EditOrderSchema, preHandler: [authMiddleware, adminMiddleware] }, async (req, rep) => {
        try {

            const order = req.body.data

        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

    //TODO:
    fastify.delete<RouteWithAuth<ReqData<DeleteOrder>>>('/api/v1/orders/delete', { schema: DeleteOrderSchema, preHandler: [authMiddleware, adminMiddleware] }, async (req, rep) => {
        try {

            const order = req.body.data

        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

    //TODO:
    fastify.get<AuthReqData>('/api/v1/orders/get-orders-images', { schema: GetOrderSchema, preHandler: [authMiddleware] }, async (req, rep) => {
        try {

        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

    //TODO:
    fastify.get<AuthReqData>('/api/v1/orders/get-order', { schema: GetOrderSchema, preHandler: [authMiddleware] }, async (req, rep) => {
        try {

        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

}

export default fp(OrderRoutes);