import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateUserUseCase } from "@/application/factories/make-create-user-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    role: z.enum(["ADMIN", "COLLABORATOR", "MANAGER"]).default("COLLABORATOR"),
    is_active: z.boolean().default(true),
  });

  const { name, email, password, role, is_active } = registerBodySchema.parse(
    request.body
  );
  const registerUseCase = makeCreateUserUseCase();
  await registerUseCase.execute({
    email,
    name,
    password,
    role,
    is_active,
  });

  return reply.status(201).send();
}
