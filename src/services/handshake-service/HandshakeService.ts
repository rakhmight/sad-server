import { FastifyRedis } from '@fastify/redis'
import { Crypt } from 'hybrid-crypto-js'

export async function prepareSymmetricKey(symmetricKey:string, publicKey:string){   

    const crypt = new Crypt({
        aesStandard: 'AES-CBC',
        rsaStandard: 'RSA-OAEP',
    });

    const encryptedData = crypt.encrypt(publicKey, symmetricKey);
    return encryptedData
}

export async function saveSymmetricKey(symmetricKey:string, deviceID:string, redis:FastifyRedis){
    const keyData = await redis.set(deviceID, symmetricKey, 'EX', 24*60*60)
    return keyData
}