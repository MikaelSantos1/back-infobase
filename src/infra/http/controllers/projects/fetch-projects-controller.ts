import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchProjectUseCase } from "@/application/factories/make-fetch-projects-use-case";

export async function fetchProjects(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const FetchProjectUseCase = makeFetchProjectUseCase();

	const { projects } = await FetchProjectUseCase.execute();

	return reply.status(200).send({ projects });
}
