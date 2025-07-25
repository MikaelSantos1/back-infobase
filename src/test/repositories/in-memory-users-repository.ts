import { $Enums, type Prisma, type User } from "@prisma/client";
import { randomUUID } from "crypto";
import type { UsersRepository } from "@/application/repositories/users-repository";

export class InMemoryUsersRepository implements UsersRepository {
	public itens: User[] = [];
	async create(data: Prisma.UserCreateInput) {
		const user: User = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date(),
			is_active: true,
			role: "COLLABORATOR",
		};
		this.itens.push(user);
		return user;
	}
	async findByEmail(email: string) {
		const user = this.itens.find((item) => item.email === email);
		if (!user) {
			return null;
		}
		return user;
	}

	async disable(userId: string) {
		const index = this.itens.findIndex((item) => item.id === userId);

		const user = this.itens[index];

		user.is_active = false;

		this.itens[index] = user;
	}
}
