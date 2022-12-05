import { FastifyPluginOptions } from 'fastify';

export const createSchema: FastifyPluginOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 1
        }
      },
      required: ['name'],
    },
  },
}

export const updateSchema: FastifyPluginOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          minimum: 1
        },
        name: {
          type: 'string',
          minLength: 1
        }
      },
      required: ['id', 'name'],
    },
  },
}