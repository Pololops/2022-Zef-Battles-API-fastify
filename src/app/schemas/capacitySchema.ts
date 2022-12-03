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
        description: {
          type: 'string',
        }
      },
      required: ['name'],
    },
  },
}

export const createAndAssociateToCharacterSchema: FastifyPluginOptions = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 1
        },
        description: {
          type: 'string',
        },
        level: {
          type: 'number', 
          minimum: 0, 
          maximum: 100
        }
      },
      required: ['name'],
    },
  },
}