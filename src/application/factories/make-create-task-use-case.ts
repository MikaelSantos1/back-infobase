import { PrismaProjectsRepository } from "@/infra/database/prisma/repositories/prisma-projects-repository";
import { PrismaTasksRepository } from "@/infra/database/prisma/repositories/prisma-tasks-repository";
import { CreateTaskUseCase } from "../use-cases/create-task-use-case";

export function makeCreateTaskUseCase() {
	const prismaProjectRepository = new PrismaProjectsRepository();
	const prismaTaskRepository = new PrismaTasksRepository();
	const useCase = new CreateTaskUseCase(
		prismaTaskRepository,
		prismaProjectRepository,
	);
	return useCase;
}
