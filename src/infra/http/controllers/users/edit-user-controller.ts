import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeEditUserUseCase } from "@/application/factories/make-edit-user-use-case";

export async function edit(request: FastifyRequest, reply: FastifyReply) {
	const edituserBodySchema = z.object({
		name: z.string(),

		role: z.enum(["ADMIN", "COLLABORATOR", "MANAGER"]).default("COLLABORATOR"),
		is_active: z.boolean().default(true),
	});

	const edituserParamsSchema = z.object({
		email: z.string(),
	});

	const { name, is_active, role } = edituserBodySchema.parse(request.body);
	const { email } = edituserParamsSchema.parse(request.params);

	const editProjectUseCase = makeEditUserUseCase();

	await editProjectUseCase.execute({
		name,
		is_active,
		role,
		email,
	});

	return reply.status(200).send();
}
