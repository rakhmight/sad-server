const pjson = require('../../package.json')

export const swaggerParams = {
    swagger: {
      info: {
        title: 'SA Distributor server API documentation',
        description: 'structures of requests, responses and errors are described',
        version: pjson.version,
        contact: {
          name: pjson.author,
          email: pjson.email
        }
      }
    }
  }