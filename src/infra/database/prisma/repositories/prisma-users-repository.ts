import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "@/application/repositories/users-repository";
import { prisma } from "@/infra/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email,
				is_active: true,
			},
		});

		return user;
	}

	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data,
		});

		return user;
	}

	async disable(userId: string): Promise<void> {
		await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				is_active: false,
			},
		});
	}
	async fetchUsers(userId: string): Promise<Omit<User, "password_hash">[]> {
		return await prisma.user.findMany({
			select: {
				name: true,
				created_at: true,
				email: true,
				id: true,
				is_active: true,
				role: true,
			},
			where: {
				id: {
					not: userId,
				},
			},
		});
	}
	async save(user: User): Promise<User> {
		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: user,
		});
		return updatedUser;
	}
}
