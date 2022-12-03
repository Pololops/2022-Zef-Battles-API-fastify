import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { createSchema as createFamilySchema } from '../../schemas/familySchema'
import { createSchema as createCharacterSchema } from '../../schemas/characterSchema'

export default async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  /**
   * GET /api/family
   * @summary Get all families order by name
   * @tags Family
	 * @param {boolean} withcharacters.query - get all characters in each family
   * @return {array<Family>} 200 - success response - application/json
   */
  fastify.route<{ Querystring: { withcharacters?: true } }>({
		method: 'GET',
		url: '/',
		handler: async (request, reply) => {
			const { withcharacters } = request.query
			reply
				.code(200)
				.send({ 
					method: 'GET', 
					response: `All families ${withcharacters ? 'with' : 'without'} their characters`,
				})
  	}
	})

  /**
	 * POST /api/family
	 * @summary Create a family
	 * @tags Family
	 * @param {InputFamily} request.body.required - family info
	 * @return {Family} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - Family not found - application/json
	 * @example request - example payload
	 * {
	 *   "name": "Minions"
	 * }
	 * @example request - other payload example
	 * {
	 *   "name": "Schtroumpfs"
	 * }
	 */
  fastify.route<{ Body: { name: string } }>({
		method: 'POST',
		url: '/',
		schema: createFamilySchema,
		handler: async (request, reply) => {
			const { name } = request.body
			reply
				.code(200)
				.send({ 
					method: 'POST', 
					response: `Creation of a new family named ${name}`,
				})
		}
	})

	/**
	 * DELETE /api/family/{id}
	 * @summary Delete a family
	 * @tags Family
	 * @param {number} id.path.required - family identifier
	 * @return 204 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - Family not found - application/json
	 */
  fastify.route<{ Params: { id: number } }>({
		method: 'DELETE',
		url: '/:id(\\d+)',
		handler:  async (request, reply) => {
			const { id } = request.params
			reply
				.code(200)
				.send({ 
					method: 'DELETE', 
					response: `Delete the family number ${id}`,
				})
		}
	})
}
