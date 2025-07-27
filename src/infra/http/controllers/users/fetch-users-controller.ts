import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchProjectUseCase } from "@/application/factories/make-fetch-projects-use-case";
import { makeFetchUsersUseCase } from "@/application/factories/make-fetch-users-use-case";

export async function fetchUsers(request: FastifyRequest, reply: FastifyReply) {
	const fetchUsersUseCase = makeFetchUsersUseCase();
	const userId = request.user.sub;

	const { users } = await fetchUsersUseCase.execute({ userId });

	return reply.status(200).send({ users });
}
