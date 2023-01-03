import type { FastifyInstance } from 'fastify'

import { readSchema, createSchema, updateSchema, deleteSchema } from '../../schemas/familySchema'

import controller from '../../controllers/familyController'

export default async (router: FastifyInstance): Promise<void> => {
	router
		.get(
			'/', 
			{ schema: readSchema }, 
			controller.getAll(router)
		)

		.post(
			'/', 
			{ schema: createSchema }, 
			controller.create(router)
		)

		.get(
			'/:id(\\d+)',
			controller.getOneByPk(router)
		)

		.patch(
			'/:id(\\d+)', 
			{ schema: updateSchema }, 
			controller.update(router)
		)

		.delete(
			'/:id(\\d+)', 
			{ schema: deleteSchema }, 
			controller.delete(router)
		)
}
