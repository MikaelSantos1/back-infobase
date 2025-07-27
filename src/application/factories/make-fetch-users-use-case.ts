

import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";
import { FetchUsersUseCase } from "../use-cases/fetch-users-use-case";

export function makeFetchUsersUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const useCase = new FetchUsersUseCase(prismaUsersRepository);
    return useCase;
}
