import { PrismaProjectsRepository } from "@/infra/database/prisma/repositories/prisma-projects-repository";
import { FetchProjectsUseCase } from "../use-cases/fetch-projects-use-case";


export function makeFetchProjectUseCase() {
    const prismaProjectRepository = new PrismaProjectsRepository();
    const fetchProjectUseCase = new FetchProjectsUseCase(prismaProjectRepository);
    return fetchProjectUseCase;
}
