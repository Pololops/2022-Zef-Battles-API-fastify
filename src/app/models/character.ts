import Fastify from 'fastify'
import client from '../database'

const fastify = Fastify({ logger: true })

export default {
	async findAllInFamily(familyId: number) {
		const result = await client.query(
			`SELECT * FROM "character_with_capacity" WHERE "family_id" = $1 ORDER BY "name"`,
			[familyId],
		)

		fastify.log.info('findAllInFamily : ', result.rows)
		return result.rows
	},

	async findByPk(id: number) {
		const result = await client.query(
			`SELECT * FROM "character_with_capacity" WHERE "id" = $1`,
			[id],
		)

		fastify.log.info('findByPk : ', result.rows)
		return result.rows[0]
	},

	async isUnique(inputData: { name: string }, id?: number) {
		const values = [inputData.name]
		let query = `SELECT * FROM "character" WHERE "name" = $1`

		if (id) {
			query += ` AND id <> $${values.length + 1}`
			values.push(`${id}`)
		}
		const result = await client.query(query, values)

		if (result.rowCount === 0) {
			return null
		}

		fastify.log.info('isUnique : ', result.rows[0])
		return result.rows[0]
	},

	async insertInFamily(inputData: { name: string, picture: string, family_id: number }) {
		const fields = Object.keys(inputData).map((key) => `"${key}"`)
		const numberFields = Object.keys(inputData).map(
			(_, index) => `$${index + 1}`,
		)
		const values = Object.values(inputData)

		const result = await client.query(
			`INSERT INTO "character" (${fields}) VALUES (${numberFields}) RETURNING *`,
			values,
		)

		fastify.log.info('insertInFamily : ', result.rows[0])
		return result.rows[0]
	},

	async update(id: number, inputData: { name: string }) {
		const fields = Object.keys(inputData).map(
			(prop, index) => `"${prop}" = $${index + 1}`,
		)
		const values = Object.values(inputData)

		const result = await client.query(
			`UPDATE "character" SET ${fields} WHERE "id" = $${
				fields.length + 1
			} RETURNING *`,
			[...values, id],
		)

		fastify.log.info('update : ', result.rows[0])
		return result.rows[0]
	},

	async delete(id: number) {
		const result = await client.query(
			`DELETE FROM "character" WHERE id = $1 RETURNING *`,
			[id],
		)

		fastify.log.info('delete : ', !!result.rowCount, result.rows[0])
		return result.rows[0]
	},

	async hasCapacity(characterId: number, capacityId: number) {
		const result = await client.query(
			`SELECT * FROM "character_has_capacity" WHERE "character_id" = $1 AND "capacity_id" = $2`,
			[characterId, capacityId],
		)

		if (result.rowCount === 0) {
			return null
		}

		fastify.log.info('hasCapacity : ', result.rows[0])
		return result.rows[0]
	},

	async addCapacityToCharacter(characterId: number, capacityId: number, level: number) {
		const result = await client.query(
			`INSERT INTO "character_has_capacity" ("character_id", "capacity_id", "level") VALUES ($1, $2, $3) RETURNING *`,
			[characterId, capacityId, level],
		)

		fastify.log.info('addCapacityToCharacter : ', result.rows[0])
		return result.rows[0]
	},

	async removeCapacityToCharacter(characterId: number, capacityId: number) {
		const result = await client.query(
			`DELETE FROM "character_has_capacity" WHERE character_id = $1 AND capacity_id = $2`,
			[characterId, capacityId],
		)

		fastify.log.info('removeCapacityToCharacter : ', !!result.rowCount)
		return !!result.rowCount
	},
}