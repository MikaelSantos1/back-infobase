import { PrismaProjectsRepository } from "@/infra/database/prisma/repositories/prisma-projects-repository";
import { DeleteProjectUseCase } from "../use-cases/delete-project-use-case";

export function makeDeleteProjectUseCase() {
	const prismaProjectRepository = new PrismaProjectsRepository();
	const deleteProjectUseCase = new DeleteProjectUseCase(
		prismaProjectRepository,
	);
	return deleteProjectUseCase;
}
