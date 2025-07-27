import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";
import { EditUserUseCase } from "../use-cases/edit-user-use-case";

export function makeEditUserUseCase() {
	const prismaProjectRepository = new PrismaUsersRepository();
	const useCase = new EditUserUseCase(prismaProjectRepository);
	return useCase;
}
