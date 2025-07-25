import { FastifyInstance } from 'fastify'
import { register } from './create-user-controller'
import { authenticate } from './authenticate-user-controller'
import { jwtAuth } from '../../middlewares/jwt-auth'


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', { onRequest:jwtAuth }, register)
  app.post('/users/sign-in', authenticate)
}