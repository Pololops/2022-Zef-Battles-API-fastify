import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fastifyPlugin from "fastify-plugin";

import { Pool } from 'pg'

const config = {
	connectionString: process.env.DATABASE_URL,
}
const client = new Pool(config);

export default fastifyPlugin(
  async (fastify: FastifyInstance, options: FastifyPluginOptions) => { 
    try { 
        await client.connect() 
        fastify.log.info("db connected succesfully") 
        fastify.decorate('db', {client}) 
    } catch(error) { 
        fastify.log.error(error) 
    } 
  }
)
