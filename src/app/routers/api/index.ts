import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import familyRouter from './familyRouter';
import characterInFamilyRouter from './characterInFamilyRouter';
import characterRouter from './characterRouter';
// import capacityRouter from './capacityRouter';
// import battleRouter from './battleRouter';

export default async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  fastify.get('/', async (request, reply) => {
    reply.code(200).send({ greet: 'hello' })
  })


  fastify.register(familyRouter, { prefix: '/family' });
  fastify.register(characterInFamilyRouter, { prefix: '/family/:id(\\d+)/character' });
  fastify.register(characterRouter, { prefix: '/character' });
  //  fastify.register((api, opts, done) => capacityRouter, { prefix: '/capacity' });

  //  fastify.register((api, opts, done) => battleRouter, { prefix: '/battle' });
}
