import { FastifyPluginAsync, FastifyPluginOptions, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import mongoose from 'mongoose';
import { DepartmentModel } from '../models/department/DepartmentModel';
import { MemberModel } from '../models/member/MemberModel';
import { OrderModel } from '../models/order/OrderModel';

const ConnectDB: FastifyPluginAsync<MyPluginOptions> = async (
    fastify: FastifyInstance,
    options: FastifyPluginOptions
) => {
    try {
        mongoose.connection.on('connected', () => {
            fastify.log.info({ actor: 'MongoDB' }, 'connected');
        });
        mongoose.connection.on('disconnected', () => {
            fastify.log.error({ actor: 'MongoDB' }, 'disconnected');
        });
        const db = await mongoose.connect(options.url, {
            autoIndex: false
        });
        const models: Models = { DepartmentModel, MemberModel, OrderModel };
        // fastify.decorate('db', { models });
    } catch (error) {
        fastify.log.error({ actor: 'MongoDB' }, (error as Error).message);
    }
};

export const dbPlugin = fp(ConnectDB);

export const dbParams = { url: `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@127.0.0.1:27017/${process.env.MONGO_DB_NAME}` }