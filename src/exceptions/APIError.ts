import { FastifyReply, FastifyRequest } from 'fastify'

export default function (error:Error, rep:FastifyReply, req:FastifyRequest, data?: APIErrorI){
    switch (error.message) {
        case 'not-found':
            return rep.code(404).send({statusCode: 404, message: `Not found`})
        case 'no-access':
            return rep.code(403).send({statusCode: 403, message: `Access is denied (forbidden)`})
        case 'bad-req':
            return rep.code(400).send({statusCode: 400, message: `Bad request`})
        case 'user-not-found':
            return rep.code(404).send({statusCode: 404, message: `User not found`})
        case 'un-auth':
            return rep.code(401).send({statusCode: 401, message: `Unauthorized`})
        case 'pwd-wrong':
            req.log.error(`Potential user (login: ${ data?.login }) password guessing attempt!`);
            return rep.code(404).send({statusCode: 404, message: `User not found`})
        case 'locked':
            return rep.code(423).send({statusCode: 423, message: `Locked`})
        case 'invalid-key':
            return rep.code(423).send({statusCode: 423, message: `Invalid key (locked)`})
    
        default:            
            req.log.error(error);
            return rep.code(500).send({statusCode: 500, message: `Some technical problems on our side. Sorry`})
    }
}