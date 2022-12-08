import Fastify from 'fastify'
import client from '../database'

const fastify = Fastify({ logger: true })

export default {
	async findAll() {
		const result = await client.query(
			`SELECT * FROM "capacity" ORDER BY "name";`,
		)

		fastify.log.info('findAll : ', result.rows)
		return result.rows
	},

	async findByPk(id: number) {
		const result = await client.query(
			`SELECT * FROM "capacity" WHERE "id" = $1;`,
			[id],
		)

		fastify.log.info('findByPk : ', result.rows)
		return result.rows[0]
	},

	async findByName(name: string) {
		const result = await client.query(
			`SELECT * FROM "capacity" WHERE "name" = $1;`,
			[name],
		)

		fastify.log.info('findByName : ', result.rows)
		return result.rows[0]
	},

	async isUnique(name: string) {
		const result = await client.query(`SELECT * FROM "capacity" WHERE "name" = $1;`, [ name ])

		if (result.rowCount === 0) {
			return null
		}

		fastify.log.info('isUnique : ', result.rows[0])
		return result.rows[0]
	},

	async insert(inputData: { name: string, description?: string }) {
    const values = [inputData.name]
		let preparedQuery;

		if (inputData.description) {
			preparedQuery = `INSERT INTO "capacity" ("name", "description") VALUES ($1, $2) RETURNING *;`
			values.push(inputData.description)
		} else {
      preparedQuery = `INSERT INTO "capacity" ("name") VALUES ($1) RETURNING *;`
    }

		const result = await client.query(preparedQuery, values)

		fastify.log.info('insert : ', result.rows[0])
		return result.rows[0]
	},

	async update(id: number, inputData: { name: string, description?: string }) {
		const fields = Object.keys(inputData).map(
			(prop, index) => `"${prop}" = $${index + 1}`,
		)
		const values = Object.values(inputData)

		const result = await client.query(
			`UPDATE "capacity" SET ${fields} WHERE "id" = $${
				fields.length + 1
			} RETURNING *;`,
			[...values, id],
		)

		fastify.log.info('update : ', result.rows[0])
		return result.rows[0]
	},

	async delete(id: number) {
		const result = await client.query(`DELETE FROM "capacity" WHERE id = $1;`, [
			id,
		])

		fastify.log.info('delete : ', !!result.rowCount)
		return !!result.rowCount
	},
}
