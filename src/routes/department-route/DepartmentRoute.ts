import { 
    FastifyInstance, 
    FastifyPluginOptions, 
    FastifyPluginAsync 
} from 'fastify';
import fp from 'fastify-plugin';
import APIError from '../../exceptions/APIError';
import { AddDepartmentSchema, EditDepartmentSchema, GetDepartmentsSchema, DeleteDepartmentSchema } from './schemas';
import authMiddleware from '../../middleware/authMiddleware';
import adminMiddleware from '../../middleware/adminMiddleware';
import { AddDepartment, EditDepartment, DeleteDepartment, GetAllDepartments } from '../../services/department-service/DepartmentService';

const DepartmentRoutes: FastifyPluginAsync = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    fastify.post<RouteWithAuth<ReqData<AddDepartment>>>('/api/v1/departments/add', { schema: AddDepartmentSchema, preHandler: [authMiddleware, adminMiddleware] }, async (req, rep) => {
        try {
            const department = req.body.data

            const departmentData = await AddDepartment(department)

            req.log.info({ actor: 'Route: department' }, `+ Added new department with ID #${departmentData.id}`);
            return rep.code(200).send({statusCode: 200, data: { department: departmentData } })
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

    fastify.put<RouteWithAuth<ReqData<EditDepartment>>>('/api/v1/departments/edit', { schema: EditDepartmentSchema, preHandler: [authMiddleware, adminMiddleware] }, async (req, rep) => {
        try {
            const { departmentID, name } = req.body.data

            const departmentData = await EditDepartment(departmentID, name)
            
            return rep.code(200).send({statusCode: 200, data: departmentData })
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

    fastify.delete<RouteWithAuth<ReqData<DeleteDepartment>>>('/api/v1/departments/delete', { schema: DeleteDepartmentSchema, preHandler: [authMiddleware, adminMiddleware] }, async (req, rep) => {
        try {
            const { departmentID } = req.body.data

            const departmentData = await DeleteDepartment(departmentID)
            
            return rep.code(200).send({statusCode: 200, data: departmentData })
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

    fastify.get<AuthReqData>('/api/v1/departments/get-departments', { schema: GetDepartmentsSchema, preHandler: [authMiddleware] }, async (req, rep) => {
        try {
            const departments = await GetAllDepartments()

            return rep.code(200).send({statusCode: 200, data: { departments } })
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

}

export default fp(DepartmentRoutes);