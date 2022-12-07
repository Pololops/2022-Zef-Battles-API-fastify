import path from 'path'
import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import fastifyMultipart from '@fastify/multipart'

import router from './routers'

const appOptions = { logger: true }
const app = Fastify(appOptions)

const corsOptions = {
	origin: process.env.CORS_DOMAINS,
}

app
	.register(fastifyStatic, {
		root: path.join(__dirname, '../../' + process.env.UPLOADS_PATH),
		index: false,
		prefix: '/img/'
	})

	.register(fastifyCors, {
		hook: 'preHandler',
		delegator: (request, callback) => callback(null, corsOptions),
	})

	.register(fastifyMultipart, {
		addToBody: true,
		limits: {
			fileSize: 2 * 1024 * 1024,
			files: 1,
		},
	})

	.register(router)

export default app
