import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { prisma } from "@/infra/lib/prisma";

export async function makeUser() {
	const email = `user-test-${randomUUID()}@example.com`;
	const user = await prisma.user.create({
		data: {
			name: "user-test",
			email: email,
			password_hash: await hash("123456", 6),
		},
	});
	return user;
}
