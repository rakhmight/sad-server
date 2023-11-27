// modules
import fastify from 'fastify'
import 'dotenv/config'

// routes
import HandshakeRoute from './routes/handshake-route/HandshakeRoute'
import DepartmentRoute from './routes/department-route/DepartmentRoute'
import AuthRoute from './routes/auth-route/AuthRoute'
import MemberRoute from './routes/member-route/MemberRoute'
import OrderRoute from './routes/order-route/OrderRoute'

// plugins
//const { socketParams } = require('./plugins/socket')
import { dbPlugin, dbParams } from './plugins/db'
import { corsParams } from './plugins/cors'
import { cookieParams } from './plugins/cookie'
import { jwtParams } from './plugins/jwt'
import { swaggerParams } from './plugins/swagger'
import { swaggerUIParams } from './plugins/swaggerUI'
import { redisParams } from './plugins/redis'

// types
import type { FastifyCookieOptions } from '@fastify/cookie'

// middleware
import secureLayerMiddleware from './middleware/secureLayerMiddleware'
import responseMiddleware from './middleware/responseMiddleware'

export const build = (opts = {}) => {
  const app = fastify(opts)

  app.register(require('@fastify/cors'), corsParams)
  app.register(require('@fastify/cookie'), cookieParams as FastifyCookieOptions)
  app.register(require('@fastify/jwt'), jwtParams)
  //app.register(require('fastify-socket.io'), socketParams)
  app.register(dbPlugin, dbParams)
  app.register(require('@fastify/swagger'), swaggerParams)
  app.register(require('@fastify/swagger-ui'), swaggerUIParams)
  app.register(require('@fastify/redis'), redisParams)
  
  app.addHook('preValidation', secureLayerMiddleware)
  app.addHook('onSend', responseMiddleware)
  
  app.register(AuthRoute)
  app.register(DepartmentRoute)
  app.register(MemberRoute)
  app.register(OrderRoute)
  app.register(HandshakeRoute)

  app.after()
  return app;
}