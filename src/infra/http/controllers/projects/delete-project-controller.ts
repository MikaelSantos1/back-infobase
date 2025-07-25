import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeDeleteProjectUseCase } from "@/application/factories/make-delete-project-use-case";
import { ResourceNotFoundError } from "@/application/use-cases/errors/resource-not-found-error";

export async function deleteProject(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const deleteProjectParamsSchema = z.object({
		projectId: z.string().uuid(),
	});

	const { projectId } = deleteProjectParamsSchema.parse(request.params);

	const deleteProjectUseCase = makeDeleteProjectUseCase();

	await deleteProjectUseCase.execute({
		projectId,
	});

	return reply.status(204).send();
}
