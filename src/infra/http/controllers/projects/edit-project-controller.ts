import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeEditProjectUseCase } from "@/application/factories/make-edit-project-use-case";

export async function edit(request: FastifyRequest, reply: FastifyReply) {
	const editProjectBodySchema = z.object({
		name: z.string(),
	});

	const editProjectParamsSchema = z.object({
		projectId: z.string().uuid(),
	});

	const { name } = editProjectBodySchema.parse(request.body);
	const { projectId } = editProjectParamsSchema.parse(request.params);

	const editProjectUseCase = makeEditProjectUseCase();

	await editProjectUseCase.execute({
		name,
		projectId,
	});

	return reply.status(200).send();
}
