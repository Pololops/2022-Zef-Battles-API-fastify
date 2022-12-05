import type { FastifyInstance } from 'fastify'

import { associateCapacityToCharacterSchema, dissociateCapacityToCharacterSchema } from '../../schemas/capacitySchema'

export default async (router: FastifyInstance) => {
  router
		.post<{ Params: { id: number } }>(
			'/',
			{ schema: associateCapacityToCharacterSchema },
			async (request, reply) => {
				const { id } = request.params
				reply
					.code(200)
					.send({ 
						method: 'POST', 
						response: `A new capacity created and associate to the character number ${id}`,
					})
    	}
		)

		.post<{ Params: { id: number, capacityId: number } }>(
			'/:capacityId(\\d+)',
			{ schema: dissociateCapacityToCharacterSchema },
			async (request, reply) => {
				const { id, capacityId } = request.params
				reply
					.code(200)
					.send({ 
						method: 'POST', 
						response: `Dissociate the capacity number ${capacityId} to the character number ${id}`,
					})
			}
		)
}

