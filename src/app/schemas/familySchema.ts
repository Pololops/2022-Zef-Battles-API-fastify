import { FastifyPluginOptions } from 'fastify';

export const createSchema: FastifyPluginOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        }
      },
      required: ['name'],
    },
  },
}