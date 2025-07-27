import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


import { makeChangeTaskStatusUseCase } from "@/application/factories/make-change-task-status-use-case";

export async function changeTaskStatus(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createTaskBodySchema = z.object({
    status: z.enum(["IN_PROGRESS", "COMPLETED"]),
  });

  const editProjectParamsSchema = z.object({
    taskId: z.string(),
  });

  const { status } = createTaskBodySchema.parse(request.body);
  const { taskId } = editProjectParamsSchema.parse(request.params);

  const changeTaskStatusUseCase = makeChangeTaskStatusUseCase();

  const { task } = await changeTaskStatusUseCase.execute({
    status,
    taskId,
  });

  return reply.status(200).send({ task });
}
