export const HandshakeSchema = {
    summary: 'Establishment of a single symmetric key',
    description: 'Establishment of a single symmetric key',
    tags: ['SAALS'],
    headers: {
        type: 'object',
        properties: {
            DeviceID: { type: 'string', description: 'Device (client) id issued by the server'}
        } 
    },
    body: {
        description: 'Request parameters',
        type: 'object',
        properties: {
            data: {
                type: 'object',
                properties: {
                    publicKey: { type: 'string', default: 'PUBLIC_KEY' }
                },
                required: ['publicKey']
            }
        },
        required: ['data']
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                statusCode: { type: 'integer', default: 200 },
                data: {
                    type: 'object',
                    properties: {
                        keyData: { type: 'string', default: 'OK' },
                        symmetricKey: { type: 'string', default: 'ENCRYPTED_KEY' },
                        deviceID: { type: 'string', default: 'DEVICE_ID'}
                    }
                }
            },
        }
    }
}