import { PrismaProjectsRepository } from "@/infra/database/prisma/repositories/prisma-projects-repository";
import { EditProjectUseCase } from "../use-cases/edit-project-use-case";

export function makeEditProjectUseCase() {
	const prismaProjectRepository = new PrismaProjectsRepository();
	const editProjectUseCase = new EditProjectUseCase(prismaProjectRepository);
	return editProjectUseCase;
}
