import { FastifyInstance } from 'fastify'
import { register } from './create-user-controller'
import { authenticate } from './authenticate-user-controller'


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/users/sign-in', authenticate)
}