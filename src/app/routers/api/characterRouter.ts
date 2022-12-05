import type { FastifyInstance } from 'fastify'

import { updateSchema } from '../../schemas/characterSchema'

import controller from '../../controllers/characterController'

export default async (router: FastifyInstance) => {
  router
    .get(
      '/:id(\\d+)', 
      {}, 
      controller.getOneByPk(router)
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
