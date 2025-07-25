import { hash } from "bcryptjs";
import type { FastifyInstance } from "fastify";
import request from "supertest";
import { prisma } from "@/infra/lib/prisma";

export async function createAndAuthenticateUser(
	app: FastifyInstance,
	role: "ADMIN" | "COLLABORATOR" = "COLLABORATOR",
) {
	const email = `user-${role.toLowerCase()}@test.com`;
	await prisma.user.create({
		data: {
			name: "John Doe",
			email,
			password_hash: await hash("123456", 6),
			role: role,
		},
	});

	const authResponse = await request(app.server).post("/users/sign-in").send({
		email,
		password: "123456",
	});
	const { token } = authResponse.body;
	return {
		token,
	};
}
