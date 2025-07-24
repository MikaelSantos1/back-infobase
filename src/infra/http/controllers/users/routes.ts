import { FastifyInstance } from 'fastify'
import { register } from './create-user-controller'


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)

}