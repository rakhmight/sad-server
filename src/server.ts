import { FastifyError } from "fastify"
import getHostAddress from "./utils/getHostAddress"

const { build } = require("./app.js")
// const { socketServer } = require('./socket')
const { fastifyConfig } = require('./configs')
const path = require('path')
require('dotenv').config({path: path.join(__dirname, `../.env`)})

export const app = build(fastifyConfig);

(async () => {
    try {             
        await app.ready((err:FastifyError) => {
            if (err) throw err
            app.swagger()
            //socketServer(app)
        })
        
        await app.listen({port: process.env.SERVER_PORT, host: getHostAddress() ? getHostAddress() : hostError()})
        .then(()=>{            
            app.log.info({ actor: 'SA-Distributer' }, 'Server started successfully');
        })
    } catch (err) {
        app.log.error({ actor: 'SA-Distributer' }, (err as Error).message);
        process.exit(1);
    }
})()

function hostError(){
    app.log.fatal({ actor: 'SA-Distributer' }, 'Unable to get ip address of host');
    process.exit(1);
}