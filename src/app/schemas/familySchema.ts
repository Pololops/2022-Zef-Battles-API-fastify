import { FastifyPluginOptions } from 'fastify';
import { FromSchema } from "json-schema-to-ts";

export const readSchema = {
  querystring: {
    type: 'object',
    properties: {
      withcharacters: { const: true }
    }
  } as const
}

export const createSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 1
      }
    },
    required: ['name'],
  } as const
}

export const updateSchema = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      }
    },
    required: ['id'],
  } as const,
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
  } as const
}

export const deleteSchema = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        minLength: 1
      }
    },
    required: ['id'],
  } as const
}
