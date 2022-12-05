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
          type: 'object',
        }
      },
      required: ['name', 'file', 'family_id'],
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
        },
        family_id: {
          type: 'number',
          minimum: 1
        },
        file: {
          type: 'object',
        }
      },
      required: ['id', 'name', 'file', 'family_id'],
    },
  },
}