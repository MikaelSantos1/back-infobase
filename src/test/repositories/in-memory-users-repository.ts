import {  type Prisma, type User } from "@prisma/client";
import { randomUUID } from "crypto";
import type { UsersRepository } from "@/application/repositories/users-repository";

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = [];
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
		this.items.push(user);
		return user;
	}
	async findByEmail(email: string) {
		const user = this.items.find((item) => item.email === email);
		if (!user) {
			return null;
		}
		return user;
	}

	async disable(userId: string) {
		const index = this.items.findIndex((item) => item.id === userId);

		const user = this.items[index];

		user.is_active = false;

		this.items[index] = user;
	}
	async fetchUsers(): Promise<User[] | []> {
			return this.items;
		}
}
