import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateProjectUseCase } from "@/application/factories/make-create-project-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
	try {
		const createProjectBodySchema = z.object({
			name: z.string(),
		});

		const { name } = createProjectBodySchema.parse(request.body);

		const createProjectUseCase = makeCreateProjectUseCase();

		const { project } = await createProjectUseCase.execute({
			name,
		});

		return reply.status(201).send({ project });
	} catch (error) {
		return reply.status(500).send({ message: "Internal Server Error" });
	}
}
