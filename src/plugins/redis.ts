import 'dotenv/config'

export const redisParams = { 
    host: process.env.REDIS_DB_HOST,
    port: process.env.REDIS_DB_PORT,
    password: process.env.REDIS_DB_PASSWORD,
    family: 4,
    closeClient: true,
    db: process.env.REDIS_DB_INDEX 
}