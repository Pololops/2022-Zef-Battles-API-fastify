import type { FastifyInstance, FastifyRequest, FastifyReply,} from 'fastify'
import type { DeleteByPk, PatchCapacity, PostCapacity } from './controller'

import capacityDatamapper from '../models/capacity'
import ApiError from "../errors/apiError";

export default {
  getAll: (fastify: FastifyInstance) => async (request: FastifyRequest, reply: FastifyReply) => {
		const capacities = await capacityDatamapper.findAll();

		fastify.log.info('read : ', capacities);
		reply.code(200).send(capacities)
  }, 

  create: (fastify: FastifyInstance) => async (request: PostCapacity, reply: FastifyReply) => {
    const capacity = await capacityDatamapper.isUnique(request.body.name);
		if (capacity) {
			const errorMessage = 'This capacity name already exists';
			throw new ApiError(errorMessage, { message: errorMessage, statusCode: 400 } );
		}

		const savedCapacity = await capacityDatamapper.insert(request.body);

		fastify.log.info('create : ', savedCapacity);
    reply.code(200).send(savedCapacity)
  },

  update: (fastify: FastifyInstance) => async (request: PatchCapacity, reply: FastifyReply) => {
		const id = parseInt(request.params.id);

		const capacity = await capacityDatamapper.findByPk(id);
		if (!capacity) {
			const errorMessage = 'This capacity does not exists';
			throw new ApiError(errorMessage, { message: errorMessage, statusCode: 404 } );
		}

		if (request.body.name, id) {
			const existingCapacity = await capacityDatamapper.isUnique(request.body.name, id);
			if (existingCapacity) {
			const errorMessage = 'Other capacity already exists with this name';
			throw new ApiError(errorMessage, { message: errorMessage, statusCode: 400 } );
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
			const errorMessage = 'This capacity does not exists';
			throw new ApiError(errorMessage, { message: errorMessage, statusCode: 404 } );
		}

		fastify.log.info('delete : ', deletedCapacity);
		reply.code(204);
	},
}
