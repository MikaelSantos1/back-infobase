import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";
import { AuthenticateUserUseCase } from "../use-cases/authenticate-user-use-case";

export function makeAuthenticateUserUseCase() {
	const prismaUserRepository = new PrismaUsersRepository();
	const authenticateUserUseCase = new AuthenticateUserUseCase(
		prismaUserRepository,
	);
	return authenticateUserUseCase;
}
