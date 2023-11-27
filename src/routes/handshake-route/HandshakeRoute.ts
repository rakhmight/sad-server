import { 
    FastifyInstance, 
    FastifyPluginOptions, 
    FastifyPluginAsync 
} from 'fastify';
import fp from 'fastify-plugin';
import APIError from '../../exceptions/APIError';
import { prepareSymmetricKey, saveSymmetricKey } from '../../services/handshake-service/HandshakeService';
import { generateSymmetricKey } from '../../utils/generateSymmetricKey';
import { HandshakeSchema } from './schemas';

const HandshakeRoutes: FastifyPluginAsync = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    fastify.post<{Body: ReqData<HandshakeWithUser>}>('/api/v1/handshake', { schema: HandshakeSchema }, async (req, rep) => {
        try {
            const { redis } = fastify
            const { publicKey } = req.body.data
            
            const deviceID = req.headers.deviceid
            
            const device = deviceID ? deviceID : `${Date.now()}-device`

            const symmetricKey = await generateSymmetricKey()
            
            const symmetricKeyData = await prepareSymmetricKey(JSON.stringify(symmetricKey), publicKey)
            
            const keyData = await saveSymmetricKey(JSON.stringify(symmetricKey), device as string, redis)                

            return rep.code(200).send({statusCode: 200, data: { keyData, symmetricKey: symmetricKeyData, deviceID: device } })
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })
}

export default fp(HandshakeRoutes);