import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUserUseCase } from "@/application/factories/make-authenticate-user-use-case";
import { InvalidCredentialsError } from "@/application/use-cases/errors/invalid-credentials-error";

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { email, password } = authenticateBodySchema.parse(request.body);
	try {
		const authenticateUseCase = makeAuthenticateUserUseCase();

		const { user } = await authenticateUseCase.execute({
			email,
			password,
		});

		const token = await reply.jwtSign(
			{
				role: user.role,
			},
			{
				sign: {
					sub: user.id,
				},
			},
		);

		return reply.status(200).send({
			token,
			id: user.id,
			name: user.name,
			role: user.role,
		});
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: err.message });
		}

		throw err;
	}
}
