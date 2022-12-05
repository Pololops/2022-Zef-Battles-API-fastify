import fastify from 'fastify'

import Cors from '@fastify/cors'

import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import path from 'path'
import Static from '@fastify/static'

import router from './routers'

export const app = fastify({ logger: true }).withTypeProvider<JsonSchemaToTsProvider>()

// fastify.register(Static, {
//   root: path.join(__dirname, process.env.UPLOADS_PATH || ''),
//   prefix: '/'
// })

const corsOptions = {
  origin: process.env.CORS_DOMAINS,
}
app.register(Cors, { 
  hook: 'preHandler',
  delegator: (request, callback) => {
    callback(null, corsOptions)
  },
})

app.register(router)
