import fastify from 'fastify'

import Cors from '@fastify/cors'

import path from 'path'
import Static from '@fastify/static'

import fastifyMultipart from '@fastify/multipart'

import router from './routers'

const appOptions = { logger: true }
export const app = fastify(appOptions)
app.register(Static, {
  root: path.join(__dirname, process.env.UPLOADS_PATH || 'public/upload'),
  prefix: '/'
})

const corsOptions = {
  origin: process.env.CORS_DOMAINS,
}
app.register(Cors, { 
  hook: 'preHandler',
  delegator: (request, callback) => callback(null, corsOptions),
})

app.register(fastifyMultipart, {
  addToBody: true,
  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 1,
  },
});

app.register(router, { logger: true })
