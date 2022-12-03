import { FastifyPluginOptions } from 'fastify';

export const createSchema: FastifyPluginOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 1
        },
        family_id: {
          type: 'number',
          minimum: 1
        },
        file: {
          type: 'string',
        }
      },
      required: ['name', 'file', 'family_id'],
    },
  },
}
