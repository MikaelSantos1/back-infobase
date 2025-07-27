import type { Prisma, User } from "@prisma/client";

export interface UsersRepository {
	create(data: Prisma.UserCreateInput): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
	disable(userId: string): Promise<void>;
	fetchUsers(userId?:string): Promise<Omit<User, "password_hash">[]>
	save(task: User): Promise<User>;
}
