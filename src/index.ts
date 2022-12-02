import * as dotenv from 'dotenv'
dotenv.config();

import Fastify from 'fastify'

import app from './app/app'

const fastify = Fastify({ logger: true })

const port = Number(process.env.PORT) || 5000
const host = process.env.HOST
const dbUrl = process.env.DATABASE_URL

// fastify.register(db, { dbUrl });
fastify.register(app)

const start = async () => {
  try {
    await fastify.listen({ host, port });
    console.log(`✅ Server running on ${host}:${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()