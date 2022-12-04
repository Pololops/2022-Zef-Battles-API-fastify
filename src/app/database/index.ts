import { FastifyInstance } from 'fastify'
import fastifyPlugin from "fastify-plugin";

import { Pool } from 'pg'

const config = {
	connectionString: process.env.DATABASE_URL,
}
const client = new Pool(config);

// const client = {
// 	originalClient: pool,
// 
// 	async query(...params) {
// 		debug('SQL request : ', ...params);
// 
// 		return this.originalClient.query(...params);
// 	},
// };

export default client;