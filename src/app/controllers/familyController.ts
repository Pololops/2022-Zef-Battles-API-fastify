import type { FastifyInstance, FastifyReply,} from 'fastify'
import type { DeleteByPk, GetByPk, GetFamilies, PatchFamily, PostFamily } from './controller'

import familyDatamapper from '../models/family'
import ApiError from "../errors/apiError";

export default {
  getAll: (fastify: FastifyInstance) => async (request: GetFamilies, reply: FastifyReply) => {
		const { withcharacters } = request.query

		let families;
		if (withcharacters) {
			families = await familyDatamapper.findAllWithCharacters();
			fastify.log.info('getAll with characters : ', families);
		} else {
			families = await familyDatamapper.findAll()
			fastify.log.info('read : ', families);
		}

		reply.code(200).send(families)
  }, 

  getOneByPk: (fastify: FastifyInstance) => async (request: GetByPk, reply: FastifyReply) => {
		const familyId = parseInt(request.params.id)

		const family = await familyDatamapper.findByPk(familyId)

		if (!family) {
			const errorMessage = 'This family does not exist';
			throw new ApiError(errorMessage, { message: errorMessage, statusCode: 404 } );
		}

		fastify.log.info('read : ', family)
		reply.code(200).send(family)
  }, 


  create: (fastify: FastifyInstance) => async (request: PostFamily, reply: FastifyReply) => {
    const family = await familyDatamapper.isUnique(request.body);

    if (family) {
			const errorMessage = 'This family name already exists';
			throw new ApiError(errorMessage, { message: errorMessage, statusCode: 400 } );
		}

		const savedFamily = await familyDatamapper.insert(request.body);

		fastify.log.info('create : ', savedFamily);
    reply.code(200).send(savedFamily)
  },

  update: (fastify: FastifyInstance) => async (request: PatchFamily, reply: FastifyReply) => {
		const id = parseInt(request.params.id);

		const family = await familyDatamapper.findByPk(id);
		if (!family) {
			const errorMessage = 'This family does not exists';
			throw new ApiError(errorMessage, { message: errorMessage, statusCode: 404 } );
		}

		if (request.body.name) {
			const existingFamily = await familyDatamapper.isUnique(request.body);
			if (existingFamily) {
				const errorMessage = 'Other family already exists with this name';
				throw new ApiError(errorMessage, { message: errorMessage, statusCode: 400 } );
			}
		}

		const savedFamily = await familyDatamapper.update(id, request.body);

		fastify.log.info('update : ', savedFamily);
		reply.code(200).send(savedFamily);
	},
  
  delete: (fastify: FastifyInstance) => async (request: DeleteByPk, reply: FastifyReply) => {
    const id = parseInt(request.params.id)

		const deletedFamily = await familyDatamapper.delete(id);

		if (!deletedFamily) {
			const errorMessage = 'This family does not exists';
			throw new ApiError(errorMessage, { message: errorMessage, statusCode: 404 } );
		}

		fastify.log.info('delete : ', deletedFamily);
		reply.code(204);
	},
}
