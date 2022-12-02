import { FastifyPluginOptions } from 'fastify';

export const createSchema: FastifyPluginOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        family_id: {
          type: 'number',
        },
        file: {
          type: 'string',
        }
      },
      required: ['name', 'file', 'family_id'],
    },
  },
}