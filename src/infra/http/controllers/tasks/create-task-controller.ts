import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateTaskUseCase } from "@/application/factories/make-create-task-use-case";
import { ResourceNotFoundError } from "@/application/use-cases/errors/resource-not-found-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createTaskBodySchema = z.object({
		title: z.string(),
		status: z.enum(["IN_PROGRESS", "COMPLETED"]),
		projectId: z.string(),
	});

	const { title, status, projectId } = createTaskBodySchema.parse(request.body);

	const createTaskUseCase = makeCreateTaskUseCase();

	const { task } = await createTaskUseCase.execute({
		title,
		status,
		projectId,
	});

	return reply.status(201).send({ task });
}
