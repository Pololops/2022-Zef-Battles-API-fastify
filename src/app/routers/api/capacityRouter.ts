import type { FastifyInstance } from 'fastify'

import { createSchema, updateSchema } from '../../schemas/capacitySchema'

import controller from '../../controllers/capacityController'


export default async (router: FastifyInstance) => {
  router
    .get(
      '/',
      {},
      controller.getAll(router)
    )

    .post(
      '/',
      { schema: createSchema },
      controller.create(router)
    )

    .patch(
      '/:id(\\d+)',
      { schema: updateSchema },
      controller.update(router)
    )

    .delete(
      '/:id(\\d+)',
      {},
      controller.delete(router)
    )
}

