import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

import familyDatamapper from '../models/family'

type GetRequest = FastifyRequest<{
  Querystring: { withcharacters?: true }
}>

type PostRequest = FastifyRequest<{
  Body: { name: string }
}>

type DeleteRequest = FastifyRequest<{
  Params: { id: string },
}>

type PatchRequest = FastifyRequest<{
  Params: { id: string },
  Body: { name: string }
}>

export default { 
  getAll: async (request: GetRequest, reply: FastifyReply) => {
    const { withcharacters } = request.query

		let families;
		if (withcharacters) {
			families = await familyDatamapper.findAllWithCharacters();
			// fastify.log.info('getAll with characters : ', families);
		} else {
			families = await familyDatamapper.findAll()
			// fastify.log.info('getAll : ', families);
		}

		reply.code(200).send(families)
  }, 

  create: async (request: PostRequest, reply: FastifyReply) => {
    const family = await familyDatamapper.isUnique(request.body);

    if (family) {
			throw new Error('This family name already exists', /* { statusCode: 400 } */);
		}

		const savedFamily = await familyDatamapper.insert(request.body);

    reply.code(200).send(savedFamily)
  },

  update: async (request: PatchRequest, reply: FastifyReply) => {
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

		// fastify.log.info('update : ', savedFamily);
		reply.code(200).send(savedFamily);
	},
  
  delete: async (request: DeleteRequest, reply: FastifyReply) => {
    const id = parseInt(request.params.id)

		const deletedFamily = await familyDatamapper.delete(id);

		if (!deletedFamily) {
			throw new Error('This family does not exists', /* { statusCode: 404 } */)
		}

		// fastify.log.info('delete : ', deletedFamily);
		reply.code(204);
	},
}
