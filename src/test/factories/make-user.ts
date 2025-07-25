import { hash } from "bcryptjs";
import { prisma } from "@/infra/lib/prisma";

export async function makeUser() {
	const user = await prisma.user.create({
		data: {
			name: "user-test",
			email: "user-test@example.com",
			password_hash: await hash("123456", 6),
		},
	});
	return user;
}
