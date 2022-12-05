import Fastify from 'fastify'
const fastify = Fastify({ logger: true })

import { Pool } from 'pg'

const config = {
	connectionString: process.env.DATABASE_URL,
}
const pool = new Pool(config);

const client = {
	originalClient: pool,

	async query(query: string, params?: (string | number)[]) {
		fastify.log.info('SQL request : ', query, params);

		return this.originalClient.query(query, params);
	},
};

export default client;