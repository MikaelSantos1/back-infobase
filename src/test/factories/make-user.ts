import { hash } from "bcryptjs";
import { prisma } from "@/infra/lib/prisma";
import { randomUUID } from "crypto";

export async function makeUser() {
	const email = `user-test-${randomUUID()}@example.com`
	const user = await prisma.user.create({
		data: {
			name: "user-test",
			email: email,
			password_hash: await hash("123456", 6),
		},
	});
	return user;
}
