import type { FastifyInstance, FastifyReply } from 'fastify'
import type { AssociateCapacityToCharacter, DeleteByPk, DissociateCapacityFromCharacter, GetByPk, PatchCharacter, PostCharacter } from './controller'

import { saveFile, deleteFile, checkFile } from '../services/fileUploadManager'

import characterDatamapper from '../models/character'
import capacityDatamapper from '../models/capacity'

export default {
	getAllInFamily: (fastify: FastifyInstance) => async (request: GetByPk, reply: FastifyReply) => {
		const familyId = parseInt(request.params.id)

		const characters = await characterDatamapper.findAllInFamily(familyId)

		fastify.log.info('read : ', characters)
		reply.code(200).send(characters)
	},

	getOneByPk: (fastify: FastifyInstance) => async (request: GetByPk, reply: FastifyReply) => {
		const characterId = parseInt(request.params.id)

		const character = await characterDatamapper.findByPk(characterId)

		fastify.log.info('read : ', character)
		reply.code(200).send(character)
	},

	createInFamily: (fastify: FastifyInstance) => async (request: PostCharacter, reply: FastifyReply) => {
		const paramsFamilyId = Number(request.params.id)
		const { name, file } = request.body

		if (!file || file.length === 0) {
			throw new Error('You have to upload an image file.', /* { statusCode: 400 } */)
		}
		

		const character = await characterDatamapper.isUnique({ name })
		if (character) {
			throw new Error('This character already exists', /* { statusCode: 400 } */)
		}	
		
		checkFile(file[0])

		const newFilename = name
			.toLowerCase()
			.replace(' ', '-')
			.replace(/.(?<![a-z0-9-])/g, '');
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const extension = file[0].filename
			.split('.')
			.reverse()[0]
			.toLowerCase();
		const formatedFilename = `${newFilename}-${uniqueSuffix}.${extension}`;

		saveFile(formatedFilename, file[0].data);

		const savedCharacter = await characterDatamapper.insertInFamily({
			name, 
			family_id: paramsFamilyId, 
			picture: formatedFilename 
		})

		fastify.log.info('create : ', savedCharacter)
		reply.code(200).send(savedCharacter)
	},

	update: (fastify: FastifyInstance) => async (request: PatchCharacter, reply: FastifyReply) => {
		const id = parseInt(request.params.id)

		const character = await characterDatamapper.findByPk(id)
		if (!character) {
			throw new Error('This character does not exists', /* { statusCode: 404 } */)
		}

		if (request.body.name) {
			const existingCharacter = await characterDatamapper.isUnique(request.body)
			if (existingCharacter) {
				throw new Error('Other character already exists with this name', /* { statusCode: 400 } */)
			}
		}

		const savedCharacter = await characterDatamapper.update(id, request.body)

		fastify.log.info('update : ', savedCharacter)
		reply.code(200).send(savedCharacter)
	},

	delete: (fastify: FastifyInstance) => async (request: DeleteByPk, reply: FastifyReply) => {
    const id = parseInt(request.params.id)
		const deletedCharacter = await characterDatamapper.delete(id)
		if (!deletedCharacter) {
			throw new Error('This character does not exists', /* { statusCode: 404 } */)
		}

		deleteFile(deletedCharacter.picture)

		fastify.log.info('delete : ', !!deletedCharacter)
		reply.code(204)
	},

	addCapacityToCharacter: (fastify: FastifyInstance) => async (request: AssociateCapacityToCharacter, reply: FastifyReply) => {
		const characterId = parseInt(request.params.id);
		const { name, description, level } = request.body;

		const foundCharacter = await characterDatamapper.findByPk(characterId);
		if (!foundCharacter) {
			throw new Error('This character does not exists', /* { statusCode: 404 } */ );
		}

		let foundCapacity = await capacityDatamapper.findByName(name);

		if (foundCapacity) {
			const hasAlreadyThisCapacity = await characterDatamapper.hasCapacity(
				characterId,
				foundCapacity.id,
			);

			if (hasAlreadyThisCapacity) {
				throw new Error('This character already has this capacity', /* { statusCode: 400 } */);
			}
		} else {
			if (!name) {
				throw new Error('"capacity name" is required', /* { statusCode: 400 } */);
			}

			foundCapacity = await capacityDatamapper.insert({
				name,
				description,
			});
		}

		await characterDatamapper.addCapacityToCharacter(
			characterId,
			foundCapacity.id,
			level ?? 0,
		);

		const character = await characterDatamapper.findByPk(characterId);
		fastify.log.info('getOneByPk : ', character);
		return reply.code(200).send(character);
	},

	removeCapacityToCharacter: (fastify: FastifyInstance) => async (request: DissociateCapacityFromCharacter, reply: FastifyReply) => {
		const characterId = parseInt(request.params.id);
		const capacityId = parseInt(request.params.capacityId);

		const deletedCharacterHasCapacity =
			await characterDatamapper.removeCapacityToCharacter(
				characterId,
				capacityId,
			);

		if (!deletedCharacterHasCapacity) {
			throw new Error('This character does not exists', /* { statusCode: 404 } */ );
		}

		fastify.log.info('removeCapacityToCharacter : ', deletedCharacterHasCapacity);
		return reply.code(204);
	}
}