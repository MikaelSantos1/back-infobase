import type { User } from "@prisma/client";
import { hash } from "bcryptjs";
import type { UsersRepository } from "@/application/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface CreateUserUseCaseParams {
	name: string;
	email: string;
	password: string;
	role: "ADMIN" | "MANAGER" | "COLLABORATOR";
}

interface CreateUserUseCaseResponse {
	user: User;
}
export class CreateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		name,
		password,
		role,
	}: CreateUserUseCaseParams): Promise<CreateUserUseCaseResponse> {
		const password_hash = await hash(password, 6);
		const usersWithSameEmail = await this.usersRepository.findByEmail(email);

		if (usersWithSameEmail) {
			throw new UserAlreadyExistsError();
		}

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash,
			role,
		});

		return {
			user,
		};
	}
}
