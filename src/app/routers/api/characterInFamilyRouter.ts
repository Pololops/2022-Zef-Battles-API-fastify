import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import controller from '../../controllers/characterController'

import { createSchema } from '../../schemas/characterSchema'

export default async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    /**
   * GET /api/family/{familyId}/character
	 * @summary Get all characters of a family order by name
   * @tags Character
	 * @param {number} familyId.path.required - character identifier
	 * @return {array<Character>} 200 - success response - application/json
	 * @return {ApiError} 404 - character not found - application/json
   */
  fastify.route({
		method: 'GET',
    url: '/',
    handler: controller.getAllInFamily
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
  fastify.route({
		method: 'POST',
		url: '/',
		schema: createSchema,
		handler: controller.createInFamily
	})
}
