import Fastify from 'fastify'
import client from '../database'

const fastify = Fastify({ logger: true })

export default {
	async findAll() {
		const result = await client.query(
			`SELECT * FROM "family"`,
		)

		fastify.log.info('findAll : ', result.rows)
		return result.rows
	},

	async findAllWithCharacters() {
		const result = await client.query(
			`SELECT * FROM "family_with_character"`,
		)

		fastify.log.info('findAllWithCharacters : ', result.rows)
		return result.rows
	},

	async findByPk(id: number) {
		const result = await client.query(
			`SELECT * FROM "family_with_character" WHERE "family_with_character"."id" = $1`,
			[id],
		)

		fastify.log.info('findByPk : ', result.rows)
		return result.rows[0]
	},

	async isUnique(inputData: { name: string }) {
		const result = await client.query(
			`SELECT * FROM "family" WHERE "name" = $1`,
			[inputData.name],
		)

		fastify.log.info('isUnique : ', result.rows[0])
		return result.rows[0]
	},

	async insert(inputData: { name: string }) {
		const result = await client.query(
			`INSERT INTO "family" ("name") VALUES ($1) RETURNING *`,
			[inputData.name],
		)

		fastify.log.info('insert : ', result.rows[0])
		return result.rows[0]
	},

	async update(id: number, inputData: { name: string }) {
		const result = await client.query(
			`UPDATE "family" SET "name" = $1 WHERE "id" = $2 RETURNING *`,
			[inputData.name, id],
		)

		fastify.log.info('update : ', result.rows[0])
		return result.rows[0]
	},

	async delete(id: number) {
		const result = await client.query(`DELETE FROM "family" WHERE id = $1`, [
			id,
		])

		fastify.log.info('delete : ', !!result.rowCount)
		return !!result.rowCount
	},
}
