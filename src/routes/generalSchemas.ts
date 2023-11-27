export const AlreadyExistError = {
    description: 'User already exist (by login)',
    type: 'object',
    properties: {
      statusCode: { type: 'integer', default: 409 },
      message: { type: 'string', default: 'User already exist' }
    }
}

export const BadRequestError = {
    description: 'Bad request (request parameters not taken into account)',
    type: 'object',
    properties: {
      statusCode: { type: 'integer', default: 400 },
      message: { type: 'string', default: 'Bad request' }
    }
}

export const AccessDeniedError = {
    description: 'Access dined',
    type: 'object',
    properties: {
      statusCode: { type: 'integer', default: 403 },
      message: { type: 'string', default: 'Forbidden' }
    }
}

export const InternalServerError = {
    description: 'Some server internal problems',
    type: 'object',
    properties: {
      statusCode: { type: 'integer', default: 500 },
      message: { type: 'string', default: 'Internal problems' }
    }
}

export const LockedError = {
    description: 'Locked (SAALS)',
    type: 'object',
    properties: {
      statusCode: { type: 'integer', default: 423 },
      message: { type: 'string', default: 'Locked' }
    }
}

export const HeadersSchema = {
    type: 'object',
    properties: {
        Authorization: { type: 'string',  description: 'Access token (Bearer ...)' },
        DeviceID: { type: 'string', description: 'Device (client) id issued by the server'}
    },
    required: ['Authorization', 'DeviceID']    
}

export const WithoutAuthHeaderSchema = {
  type: 'object',
  properties: {
      DeviceID: { type: 'string', description: 'Device (client) id issued by the server'}
  },
  required: ['DeviceID'] 
}