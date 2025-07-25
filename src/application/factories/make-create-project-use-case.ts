import { PrismaProjectsRepository } from "@/infra/database/prisma/repositories/prisma-projects-repository";
import { CreateProjectUseCase } from "../use-cases/create-project-use-case";

export function makeCreateProjectUseCase() {
	const prismaProjectRepository = new PrismaProjectsRepository();
	const createProjectUseCase = new CreateProjectUseCase(
		prismaProjectRepository,
	);
	return createProjectUseCase;
}
