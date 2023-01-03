import path from 'path'
import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import fastifyMultipart from '@fastify/multipart'
import type { ApiErrorType } from './errors/apiError'

import router from './routers'

const appOptions = { logger: true }
const app = Fastify(appOptions)

const corsOptions = {
	origin: process.env.CORS_DOMAINS,
}

app
	.register(fastifyCors, {
		hook: 'preHandler',
		delegator: (request, callback) => callback(null, corsOptions),
	})

	.register(fastifyStatic, {
		root: path.join(__dirname, '../../' + process.env.UPLOADS_PATH),
		index: false,
		prefix: '/'
	})

	.register(fastifyMultipart, {
		addToBody: true,
		limits: {
			fileSize: 2 * 1024 * 1024,
			files: 1,
		},
	})

	.setErrorHandler((error: ApiErrorType, request, reply) => {
		let { message, infos } = error;
		let statusCode = error.infos?.statusCode;

		if (!statusCode || Number.isNaN(Number(statusCode))) {
			statusCode = 500;
		}

		if (!statusCode || statusCode !== 404) {
			app.log.error(error);
		}

		reply.status(statusCode).send(infos)
	})

	.register(router)

export default app
