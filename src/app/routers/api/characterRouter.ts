import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { updateSchema } from '../../schemas/characterSchema'

import controller from '../../controllers/characterController'

export default async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  /**
   * GET /api/character/{id}
	 * @summary Get a character by its id
   * @tags Character
	 * @param {number} id.path.required - character identifier
	 * @return {array<Character>} 200 - success response - application/json
	 * @return {ApiError} 404 - character not found - application/json
   */
  fastify.route({
    method: 'GET',
    url: '/:id(\\d+)',
    handler: controller.getOneByPk
  })

  /**
	 * PATCH /api/character/{id}
	 * @summary Update one character
	 * @tags Character
	 * @param {number} id.path.required - character identifier
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
    method: 'PATCH',
    url: '/:id(\\d+)',
    schema: updateSchema,
    handler: controller.update
  })

  /**
	 * DELETE /api/character/{id}
	 * @summary Delete one character
	 * @tags Character
	 * @param {number} id.path.required - character identifier
	 * @return 204 - success response - application/json
	 * @return {ApiError} 400 - Bad request response - application/json
	 * @return {ApiError} 404 - character not found - application/json
	 */
  fastify.route({
    method: 'DELETE',
    url: '/:id(\\d+)',
    handler: controller.delete
  })
}
