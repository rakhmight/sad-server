import { 
    FastifyInstance, 
    FastifyPluginOptions, 
    FastifyPluginAsync 
} from 'fastify';
import fp from 'fastify-plugin';
import { login, logout, refresh } from '../../services/auth-service/AuthService';
import APIError from '../../exceptions/APIError';
import { DepartmentLoginSchema, DepartmentLogoutSchema, DepartmentRefreshSchema } from './schemas';
import authMiddleware from '../../middleware/authMiddleware';

const AuthRoutes: FastifyPluginAsync = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {   

    fastify.post<RouteWithData<ReqData<DepartmentLogin>>>('/api/v1/auth/login', { schema: DepartmentLoginSchema }, async (req, rep) => {
        try {
            const { redis, jwt } = fastify
            const deviceID = req.headers.deviceid

            const departmentData = await login(req.body.data, jwt, redis, deviceID)

            req.log.info(`[SA-Messenger] + Department login ${departmentData.department.id}`);
            rep.cookie('refreshToken', departmentData.refreshToken, { maxAge: 5*24*60*60*1000, httpOnly: true , path: '/'})
            return rep.code(200).send({statusCode: 200, data: departmentData })
        } catch (error) {
            return APIError(error as Error, rep, req, { login: req.body.data.auth.login })
        }

    })

    fastify.post<RouteWithAuth<ReqData<DepartmentLogout>>>('/api/v1/auth/logout', { schema: DepartmentLogoutSchema, preHandler: [authMiddleware] }, async (req, rep) => {
        try {
            const { redis } = fastify
            const departmentID = req.body.data.departmentID
            
            const token = await logout(departmentID, redis);

            rep.clearCookie('refreshToken', { path: '/' })
            return rep.code(200).send({statusCode: 200, data: { token } })
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

    fastify.put<RouteWithData<ReqData<DepartmentRefresh>>>('/api/v1/auth/refresh', { schema: DepartmentRefreshSchema }, async (req, rep) => {
        try {
            const { refreshToken } = req.cookies
            const { redis, jwt } = fastify
            const deviceID = req.headers.deviceid

            const departmentID = req.body.data.departmentID
            const departmentData = await refresh(refreshToken as string, departmentID, jwt, redis, deviceID)
            
            rep.cookie('refreshToken', departmentData.refreshToken, { maxAge: 5*24*60*60*1000, httpOnly: true , path: '/'})
            return rep.code(200).send({statusCode: 200, data: departmentData })
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

}

export default fp(AuthRoutes);