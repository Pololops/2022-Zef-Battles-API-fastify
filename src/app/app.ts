import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import path from 'path'
import Cors from '@fastify/cors'
import Static from '@fastify/static'
import dbClient from '@fastify/postgres'

import router from './routers';

export default async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  fastify.register(dbClient, {
    connectionString: process.env.DATABASE_URL
  })

  // fastify.register(Static, {
  //   root: path.join(__dirname, process.env.UPLOADS_PATH || ''),
  //   prefix: '/'
  // })

  const corsOptions = {
    origin: process.env.CORS_DOMAINS,
  }
  fastify.register(Cors, { 
    hook: 'preHandler',
    delegator: (request, callback) => {
      callback(null, corsOptions)
    },
  })

  fastify.register(router)
}
