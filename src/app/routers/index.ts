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

    .get( // route to serve image files
      '/img/:name', 
      { schema: { 
          params: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              }
            },
            required: ['name']
          }
        }
      },
      (request, reply) => {
        const { name } = request.params as { name: string }
        reply.code(200).sendFile(name)
      }
    )
    
    .register(apiRouter, { prefix: 'api' });
}
