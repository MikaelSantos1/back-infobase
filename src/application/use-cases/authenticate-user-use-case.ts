import type { User } from "@prisma/client";
import { compare } from "bcryptjs";
import type { UsersRepository } from "@/application/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateUserUseCaseRequest {
	email: string;
	password: string;
}

interface AutheticateUserUseCaseResponse {
	user: User;
}

export class AuthenticateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}
	async execute({
		email,
		password,
	}: AuthenticateUserUseCaseRequest): Promise<AutheticateUserUseCaseResponse> {
		const user = await this.usersRepository.findByEmail(email);
		if (!user) {
			throw new InvalidCredentialsError();
		}
		const doesPasswordMatches = await compare(password, user.password_hash);

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError();
		}
		return { user };
	}
}
