import { FastifyInstance } from 'fastify'

import { jwtAuth } from '../../middlewares/jwt-auth'
import { create } from './create-project-controller'


export async function projectRoutes(app: FastifyInstance) {
  app.addHook('onRequest', jwtAuth)
  app.post('/project',  create)
}