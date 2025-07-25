import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeDeleteProjectUseCase } from "@/application/factories/make-delete-project-use-case";
import { ResourceNotFoundError } from "@/application/use-cases/errors/resource-not-found-error";

export async function deleteProject(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		const deleteProjectParamsSchema = z.object({
			projectId: z.string().uuid(),
		});

		const { projectId } = deleteProjectParamsSchema.parse(request.params);

		const deleteProjectUseCase = makeDeleteProjectUseCase();

		await deleteProjectUseCase.execute({
			projectId,
		});

		return reply.status(204).send();
	} catch (error) {
		if (error instanceof ResourceNotFoundError) {
			return reply.status(404).send({ message: "Project not found" });
		}
		return reply.status(500).send({ message: "Internal Server Error" });
	}
}
