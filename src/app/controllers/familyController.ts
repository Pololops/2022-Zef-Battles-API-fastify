import type { FastifyInstance, FastifyReply,} from 'fastify'
import type { DeleteByPk, GetFamilies, PatchFamily, PostFamily } from './controller'

import familyDatamapper from '../models/family'

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

  create: (fastify: FastifyInstance) => async (request: PostFamily, reply: FastifyReply) => {
    const family = await familyDatamapper.isUnique(request.body);

    if (family) {
			throw new Error('This family name already exists', /* { statusCode: 400 } */);
		}

		const savedFamily = await familyDatamapper.insert(request.body);

		fastify.log.info('create : ', savedFamily);
    reply.code(200).send(savedFamily)
  },

  update: (fastify: FastifyInstance) => async (request: PatchFamily, reply: FastifyReply) => {
		const id = parseInt(request.params.id);

		const family = await familyDatamapper.findByPk(id);
		if (!family) {
			throw new Error('This family does not exists', /* { statusCode: 404 }, */);
		}

		if (request.body.name) {
			const existingFamily = await familyDatamapper.isUnique(request.body);
			if (existingFamily) {
				throw new Error('Other family already exists with this name', /* { statusCode: 400 }, */);
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
			throw new Error('This family does not exists', /* { statusCode: 404 } */)
		}

		fastify.log.info('delete : ', deletedFamily);
		reply.code(204);
	},
}
