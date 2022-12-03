import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { createSchema as createCharacterSchema } from '../../schemas/characterSchema'

export default async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    /**
   * GET /api/family/{familyId}/character
	 * @summary Get all characters of a family order by name
   * @tags Character
	 * @param {number} familyId.path.required - character identifier
	 * @return {array<Character>} 200 - success response - application/json
	 * @return {ApiError} 404 - character not found - application/json
   */
  fastify.route<{ Params: { id: number } }>({
		method: 'GET',
    url: '/',
    handler: async (request, reply) => {
			const { id } = request.params
      reply
				.code(200)
				.send({ 
					method: 'GET', 
					response: `All characters of the family number ${id}`,
				})
    }
	})

  /**
	 * POST /api/family/{familyId}/character
	 * @summary Create a character
	 * @tags Character
	 * @param {number} familyId.path.required - character identifier
	 * @param {InputCharacter} request.body.required - character info
	 * @return {Character} 200 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - character not found - application/json
	 * @example request - example payload
	 * {
	 *		"name": "Schtroumpf Grognon",
	 * 		"picture": "/",
	 * 		"family_id": 2
	 * }
	 * @example request - other payload example
	 * {
	 *		"name": "Pikachu",
	 * 		"picture": "/",
	 * 		"family_id": 1
	 * }
	 */
  fastify.route<{ Params: { id: number }, Body: { name: string, file: string, family_id: number } }>({
		method: 'POST',
		url: '/',
		schema: createCharacterSchema,
		handler: async (request, reply) => {
			const { id } = request.params
			const character = request.body
			reply
				.code(200)
				.send({ 
					method: 'POST', 
					response: `Creation of a new character named ${character.name} in the family number ${id}`,
				})
  	}
	})
}
