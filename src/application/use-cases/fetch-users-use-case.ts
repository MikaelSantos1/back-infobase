import type { User } from "@prisma/client";
import type { UsersRepository } from "../repositories/users-repository";

interface FetchUsersUseCaseResponse {
	users: Omit<User, "password_hash">[];
}
interface FetchUsersUseCaseRequest {
	userId?: string;
}

export class FetchUsersUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		userId,
	}: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
		const users = await this.usersRepository.fetchUsers(userId);

		return {
			users: users,
		};
	}
}
