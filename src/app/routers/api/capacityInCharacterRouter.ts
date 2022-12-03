import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { createAndAssociateToCharacterSchema } from '../../schemas/capacitySchema'

export default async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  /**
	 * POST /api/character/{id}/capacity
	 * @summary Add one capacity to a character
	 * @tags Capacity
	 * @param {number} id.path.required - character identifier
	 * @param {AssociateCapacityToCharacter} request.body.required - capacity info
	 * @return {Character} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - character or capacity not found - application/json
	 * @example request - example payload
	 * {
	 * 		"id": 1,
	 *		"name": "Sorcellerie",
	 *		"description": "Préparation de potions magiques",
	 *		"level": 50
	 * }
	 * @example request - other payload example
	 * {
	 * 		"id": 2,
	 *		"name": "Force",
	 * 		"description": "Plein de muscles",
	 *		"level": 80
	 * }
	 */
  fastify.route<{ Params: { id: number } }>({
    method: 'POST',
    url: '/',
    schema: createAndAssociateToCharacterSchema,
    handler: async (request, reply) => {
			const { id } = request.params
      reply
				.code(200)
				.send({ 
					method: 'POST', 
					response: `A new capacity created and associate to the character number ${id}`,
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
  fastify.route<{ Params: { id: number, capacityId: number } }>({
		method: 'DELETE',
		url: '/:capacityId(\\d+)',
		handler: async (request, reply) => {
			const { id, capacityId } = request.params
			reply
				.code(200)
				.send({ 
					method: 'DELETE', 
					response: `Dissociate the capacity number ${capacityId} to the character number ${id}`,
				})
		}
  })
}

