import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDisableUserUseCase } from "@/application/factories/make-disable-user-use-case";

export async function disable(request: FastifyRequest, reply: FastifyReply) {
  const disableUserParamsSchema = z.object({
    userId: z.string(),
  });
  const { userId } = disableUserParamsSchema.parse(request.params);
  const disableUserUseCase = makeDisableUserUseCase();

  await disableUserUseCase.execute({userId});

  return reply.status(200).send({});
}
