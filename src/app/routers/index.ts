import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import apiRouter from './api';

// const opts = {
//   schema: {
//     response: {
//       '2xx': {
//         type: 'object',
//         properties: {
//           greet: { type: 'string' }
//         }
//       }
//     }
//   }
// }
// 
// interface PingParams {
//   id?: string;
// }
// 
// const schemaBody = {
//   type: "object",
//   required: ["id"],
//   properties: {
//     id: { type: "number" },
//     username: { type: "string" },
//   },
// };
// 
// const schemaResponse = {
//   200: {
//     type: "object",
//     properties: {
//       name: { type: "string" },
//     },
//   },
// };
// 
// const schema = {
//   body: schemaBody,
//   response: schemaResponse,
// };
// 
// // Body de validation pour les routes post
// const postOpts: RouteShorthandOptions = {
//   schema: {
//     body: {
//       type: 'object',
//       properties: {
//         pong: {
//           type: 'string'
//         }
//       }
//     },
//     response: {}
//   }
// };


  // router.get<{ Params: { id?: number } }>(
  //   '/ping/:id', 
  //   async (request, reply) => {
  //     const { id } = request.params
  //     if (!id) throw new Error("Add an ID after the ping!");
  //     reply.code(200).send({ pong: id })
  //   }
  // )
// 
  // router.get('/', async (request, reply) => {
  //   reply.code(200).send({ pong: 'it worked!' })
  // })

export default async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  fastify.get('/', async (request, reply) => {
    reply.code(200).send({ hello: 'world!' })
  })

  fastify.register(apiRouter, { prefix: 'api' });
}
