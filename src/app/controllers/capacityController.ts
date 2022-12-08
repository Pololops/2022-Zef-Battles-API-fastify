import type { FastifyInstance, FastifyRequest, FastifyReply,} from 'fastify'
import type { DeleteByPk, PatchCapacity, PostCapacity } from './controller'

import capacityDatamapper from '../models/capacity'

export default {
  getAll: (fastify: FastifyInstance) => async (request: FastifyRequest, reply: FastifyReply) => {
		const capacities = await capacityDatamapper.findAll();

		fastify.log.info('read : ', capacities);
		reply.code(200).send(capacities)
  }, 

  create: (fastify: FastifyInstance) => async (request: PostCapacity, reply: FastifyReply) => {
    const capacity = await capacityDatamapper.isUnique(request.body.name);
		if (capacity) {
			throw new Error('This capacity name already exists', /* { statusCode: 400 } */);
		}

		const savedCapacity = await capacityDatamapper.insert(request.body);

		fastify.log.info('create : ', savedCapacity);
    reply.code(200).send(savedCapacity)
  },

  update: (fastify: FastifyInstance) => async (request: PatchCapacity, reply: FastifyReply) => {
		const id = parseInt(request.params.id);

		const capacity = await capacityDatamapper.findByPk(id);
		if (!capacity) {
			throw new Error('This capacity does not exists', /* { statusCode: 404 } */);
		}

		if (request.body.name, id) {
			const existingCapacity = await capacityDatamapper.isUnique(request.body.name, id);
			if (existingCapacity) {
				throw new Error('Other capacity already exists with this name', /* { statusCode: 400 }, */);
			}
		}

		const savedCapacity = await capacityDatamapper.update(id, request.body);

		fastify.log.info('update : ', savedCapacity);
		reply.code(200).send(savedCapacity);
	},
  
  delete: (fastify: FastifyInstance) => async (request: DeleteByPk, reply: FastifyReply) => {
    const id = parseInt(request.params.id)

		const deletedCapacity = await capacityDatamapper.delete(id);

		if (!deletedCapacity) {
			throw new Error('This capacity does not exists', /* { statusCode: 404 } */)
		}

		fastify.log.info('delete : ', deletedCapacity);
		reply.code(204);
	},
}
