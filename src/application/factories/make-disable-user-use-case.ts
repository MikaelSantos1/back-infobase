import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";
import { DisableUserUseCase } from "../use-cases/disable-user-use-case";

export function makeDisableUserUseCase() {
	const prismaProjectRepository = new PrismaUsersRepository();
	const useCase = new DisableUserUseCase(prismaProjectRepository);
	return useCase;
}
