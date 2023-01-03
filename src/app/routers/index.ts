import { FastifyInstance, FastifyServerOptions } from 'fastify'

import apiRouter from './api';
export default async (router: FastifyInstance, options: FastifyServerOptions) => {
  router
    .get('/', async (request, reply) => {
      reply
        .code(200)
        .send({ 
          hello: `welcome into the Zef's Battle backend API`,
        })
    })
    
    .register(apiRouter, { prefix: 'api' });
}
