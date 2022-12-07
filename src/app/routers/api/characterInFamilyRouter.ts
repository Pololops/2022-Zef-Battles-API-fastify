import type { FastifyInstance } from 'fastify'

import controller from '../../controllers/characterController'

import { createSchema } from '../../schemas/characterSchema'

export default async (router: FastifyInstance) => {	
	router
		.get(
			'/',
			controller.getAllInFamily(router)
		)

		.post(
			'/',
			controller.createInFamily(router)
		)
}
