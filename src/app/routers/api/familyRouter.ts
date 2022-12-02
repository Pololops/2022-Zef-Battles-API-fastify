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
  fastify.get('/', async (request, reply) => {
    return reply.code(200).send({ method: 'GET', response: 'All families' })
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
  fastify.post<{ Body: { name: string } }>('/', createFamilySchema, async (request, reply) => {
    const { name } = request.body
    return reply.code(200).send({ method: 'POST', response: `Creation of a new family named ${name}` })
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
  fastify.delete<{ Params: { id: number } }>('/:id(\\d+)', async (request, reply) => {
    const { id } = request.params
    return reply.code(200).send({ method: 'DELETE', response: `Delete the family number ${id}` })
  })
}
