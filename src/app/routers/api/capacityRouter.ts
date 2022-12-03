import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { createSchema as createCapacitySchema } from '../../schemas/capacitySchema'

export default async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  /**
	 * GET /api/capacity
	 * @summary Get all capacities order by name
	 * @tags Capacity
	 * @return {array<Capacity>} 200 - success response - application/json
	 */
  fastify.route<{ Params: { id: number } }>({
    method: 'GET',
    url: '/',
    handler: async (request, reply) => {
      reply
        .code(200)
        .send({ 
          method: 'GET', 
          response: `All the capacities`,
        })
    }
  })

  /**
	 * POST /api/capacity
	 * @summary Create a capacity
	 * @tags Capacity
	 * @param {InputCapacity} request.body.required - capacity info
	 * @return {Capacity} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - capacity not found - application/json
	 * @example request - example payload
	 * {
	 *		"name": "Magie",
	 * 		"description": "La magie est l'art d'utiliser les potions."
	 * }
	 * @example request - other payload example
	 * {
	 *		"name": "Sagesse",
	 * 		"description": "La sagesse s'acquiert avec l'age."
	 * }
	 */
  fastify.route({
    method: 'POST',
    url: '/',
    schema: createCapacitySchema,
    handler: async (request, reply) => {
      reply
        .code(200)
        .send({ 
          method: 'POST', 
          response: `A new capacity`,
        })
    }
  })

  /**
	 * PATCH /api/capacity/{id}
	 * @summary Update one capacity
	 * @tags Capacity
	 * @param {number} id.path.required - capacity identifier
	 * @param {InputCapacity} request.body.required - capacity info
	 * @return {Capacity} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - capacity not found - application/json
	 * @example request - example payload
	 * {
	 *		"name": "Magie",
	 * 		"description": "La magie est l'art d'utiliser les potions."
	 * }
	 * @example request - other payload example
	 * {
	 *		"name": "Sagesse",
	 * 		"description": "La sagesse s'acquiert avec l'age."
	 * }
	 */
  fastify.route<{ Params: { id: number } }>({
    method: 'PATCH',
    url: '/:id(\\d+)',
    schema: createCapacitySchema,
    handler: async (request, reply) => {
      const { id } = request.params
      reply
        .code(200)
        .send({ 
          method: 'PATCH', 
          response: `Update the character number ${id}`,
        })
    }
  })

  /**
	 * DELETE /api/capacity/{id}
	 * @summary Delete one capacity
	 * @tags Capacity
	 * @param {number} id.path.required - capacity identifier
	 * @return 204 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - capacity not found - application/json
	 */
  fastify.route<{ Params: { id: number } }>({
    method: 'DELETE',
    url: '/:id(\\d+)', 
    handler: async (request, reply) => {
      const { id } = request.params
      reply
        .code(200)
        .send({ 
          method: 'DELETE', 
          response: `Delete the capacity number ${id}`,
        })
    }
  })
}

