import type { User } from "@prisma/client";
import { UsersRepository } from "../repositories/users-repository";


interface FetchUsersUseCaseResponse {
    users: User[];
}

export class FetchUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute(): Promise<FetchUsersUseCaseResponse> {
        const users = await this.usersRepository.fetchUsers()

        return {
            users: users,
        };
    }
}
