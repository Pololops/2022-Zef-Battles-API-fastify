import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { createSchema as createCharacterSchema } from '../../schemas/characterSchema'

export default async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  /**
   * GET /api/character/{id}
	 * @summary Get a character by its id
   * @tags Character
	 * @param {number} id.path.required - character identifier
	 * @return {array<Character>} 200 - success response - application/json
	 * @return {ApiError} 404 - character not found - application/json
   */
  fastify.route<{ Params: { id: number } }>({
    method: 'GET',
    url: '/:id(\\d+)',
    handler: async (request, reply) => {
      const { id } = request.params
      reply
        .code(200)
        .send({ 
          method: 'GET', 
          response: `The characters number ${id}`,
        })
    }
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
  fastify.route<{ Params: { id: number } }>({
    method: 'DELETE',
    url: '/:id(\\d+)',
    handler: async (request, reply) => {
      const { id } = request.params
      reply
        .code(200)
        .send({ 
          method: 'DELETE', 
          response: `Delete the character number ${id}`,
        })
    }
  })
}
