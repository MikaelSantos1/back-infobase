import { PrismaProjectsRepository } from "@/infra/database/prisma/repositories/prisma-projects-repository";
import { PrismaTasksRepository } from "@/infra/database/prisma/repositories/prisma-tasks-repository";

import { ChangeTaskStatusUseCase } from "../use-cases/change-task-status-use-case";

export function makeChangeTaskStatusUseCase() {
	const prismaTaskRepository = new PrismaTasksRepository();
	const useCase = new ChangeTaskStatusUseCase(prismaTaskRepository);
	return useCase;
}
