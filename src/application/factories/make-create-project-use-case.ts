
import { CreateProjectUseCase } from "../use-cases/create-project-use-case";
import { PrismaProjectsRepository } from "@/infra/database/prisma/repositories/prisma-projects-repository";


export function makeCreateProjectUseCase() {
  const prismaProjectRepository = new PrismaProjectsRepository();
  const createProjectUseCase = new CreateProjectUseCase(prismaProjectRepository);
  return createProjectUseCase;
}