import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { createSchema, updateSchema } from '../../schemas/familySchema'

import controller from '../../controllers/familyController'

export default async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  /**
   * GET /api/family
   * @summary Get all families order by name
   * @tags Family
	 * @param {boolean} withcharacters.query - get all characters in each family
   * @return {array<Family>} 200 - success response - application/json
   */
  fastify.route({
		method: 'GET',
		url: '/',
		handler: controller.getAll
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
  fastify.route({
		method: 'POST',
		url: '/',
		schema: createSchema,
		handler: controller.create
	})

	/**
	 * PATCH /api/family/{id}
	 * @summary Update a family
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
  fastify.route({
		method: 'PATCH',
		url: '/:id(\\d+)',
		schema: updateSchema,
		handler: controller.update
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
		handler: controller.delete
	})
}
