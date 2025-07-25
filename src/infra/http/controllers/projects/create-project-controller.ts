import { makeCreateProjectUseCase } from '@/application/factories/make-create-project-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    name: z.string(),
  
  })

  const { name} =
    createGymBodySchema.parse(request.body)

  const createGymUseCase = makeCreateProjectUseCase()

  await createGymUseCase.execute({
   name
  })

  return reply.status(201).send()
}