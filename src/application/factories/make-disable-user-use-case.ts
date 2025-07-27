import { DisableUserUseCase } from "../use-cases/disable-user-use-case";
import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";

export function makeDisableUserUseCase() {
    const prismaProjectRepository = new PrismaUsersRepository();
    const useCase = new DisableUserUseCase(prismaProjectRepository);
    return useCase;
}
