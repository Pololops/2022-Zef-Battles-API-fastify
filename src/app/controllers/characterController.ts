import type { FastifyInstance, FastifyReply } from 'fastify'
import type { DeleteByPk, GetByPk, PostCharacter } from './controller'

import characterDatamapper from '../models/character'

export default {
	getAllInFamily: (fastify: FastifyInstance) => async (request: GetByPk, reply: FastifyReply) => {
		const familyId = parseInt(request.params.id);

		const characters = await characterDatamapper.findAllInFamily(familyId);

		fastify.log.info('read : ', characters);
		reply.code(200).send(characters);
	},

	getOneByPk: (fastify: FastifyInstance) => async (request: GetByPk, reply: FastifyReply) => {
		const characterId = parseInt(request.params.id);

		const character = await characterDatamapper.findByPk(characterId);

		fastify.log.info('read : ', character);
		reply.code(200).send(character);
	},

	createInFamily: (fastify: FastifyInstance) => async (request: PostCharacter, reply: FastifyReply) => {
		// if (!request.file) {
		// 	throw new Error('You have to upload an image file.', /* { statusCode: 400 } */);
		// }

		// if (Number(request.file.size) > maxSize) {
		// 	throw new Error('The image file is too large! 2GB maximum.', /* { statusCode: 415 } */);
		// }

		const paramsFamilyId = parseInt(request.params.id);
    const { name, family_id } = request.body
		if (paramsFamilyId !== family_id) {
			throw new Error(
				'This character is not create in the right family, change family to create it.',
				/* { statusCode: 400 }, */
			);
		}

		const character = await characterDatamapper.isUnique(request.body);
		if (character) {
			throw new Error('This character already exists', /* { statusCode: 400 } */);
		}

		// const filename = name
		// 	.toLowerCase()
		// 	.replace(' ', '-')
		// 	.replace(/.(?<![a-z0-9-])/g, '');
		// const extension = request.file.originalname
		// 	.split('.')
		// 	.reverse()[0]
		// 	.toLowerCase();
		// const formatedFilename = `${filename}.${extension}`;
// 
		const savedCharacter = await characterDatamapper.insertInFamily(
			{ ...request.body, picture: /* formatedFilename */ '/' },
		);

		// saveFile(formatedFilename, request.file.buffer);

		fastify.log.info('create : ', savedCharacter);
		reply.code(200).send(savedCharacter);
	},

	update: (fastify: FastifyInstance) => async (request: PostCharacter, reply: FastifyReply) => {
		const id = parseInt(request.params.id);

		const character = await characterDatamapper.findByPk(id);
		if (!character) {
			throw new Error('This character does not exists', /* { statusCode: 404 } */);
		}

		if (request.body.name) {
			const existingCharacter = await characterDatamapper.isUnique(request.body);
			if (existingCharacter) {
				throw new Error('Other character already exists with this name', /* { statusCode: 400 } */);
			}
		}

		const savedCharacter = await characterDatamapper.update(id, request.body);

		fastify.log.info('update : ', savedCharacter);
		reply.code(200).send(savedCharacter);
	},

	delete: (fastify: FastifyInstance) => async (request: DeleteByPk, reply: FastifyReply) => {
    const id = parseInt(request.params.id)
		const deletedCharacter = await characterDatamapper.delete(id);
		if (!deletedCharacter) {
			throw new Error('This character does not exists', /* { statusCode: 404 } */);
		}

		// deleteFile(deletedCharacter.picture);

		fastify.log.info('delete : ', !!deletedCharacter);
		reply.code(204);
	}
}