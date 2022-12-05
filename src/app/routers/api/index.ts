import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import familyRouter from './familyRouter';
import characterInFamilyRouter from './characterInFamilyRouter';
import characterRouter from './characterRouter';
import capacityRouter from './capacityRouter';
import capacityInCharacterRouter from './capacityInCharacterRouter';
// import battleRouter from './battleRouter';

export default async (router: FastifyInstance, options: FastifyPluginOptions) => {
  router.get('/', async (request, reply) => {
    reply.code(200).send({ greet: 'hello' })
  })


  router.register(familyRouter, { prefix: '/family' });
  router.register(characterInFamilyRouter, { prefix: '/family/:id(\\d+)/character' });
  router.register(characterRouter, { prefix: '/character' });
  router.register(capacityInCharacterRouter, { prefix: '/character/:id(\\d+)/capacity' });
  router.register(capacityRouter, { prefix: '/capacity' });

  //  router.register((api, opts, done) => battleRouter, { prefix: '/battle' });
}
