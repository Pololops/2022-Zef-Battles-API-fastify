import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import apiRouter from './api';
export default async (router: FastifyInstance, options: FastifyPluginOptions) => {
  router.get('/', async (request, reply) => {
    reply
      .code(200)
      .send({ 
        hello: `welcome into the Zef's Battle backend API`,
      })
  })

  router.register(apiRouter, { prefix: 'api' });
}
