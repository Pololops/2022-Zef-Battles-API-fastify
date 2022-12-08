import type { FastifyInstance } from 'fastify'

import { associateCapacityToCharacterSchema, dissociateCapacityToCharacterSchema } from '../../schemas/capacitySchema';

import controller from '../../controllers/characterController'

export default async (router: FastifyInstance) => {
  router
		.post(
			'/',
			{ schema: associateCapacityToCharacterSchema },
      controller.addCapacityToCharacter(router)
		)

		.delete(
			'/:capacityId(\\d+)',
			{ schema: dissociateCapacityToCharacterSchema },
			controller.removeCapacityToCharacter(router)
		)
}

