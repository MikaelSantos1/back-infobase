import type { Task, TaskStatus } from "@prisma/client";
import type { ProjectsRepository } from "../repositories/projects-repository";
import type { TasksRepository } from "../repositories/tasks-repostory";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreateTaskUseCaseRequest {
	title: string;
	projectId: string;
	status: TaskStatus;
}

interface CreateTaskUseCaseResponse {
	task: Task;
}

export class CreateTaskUseCase {
	constructor(
		private tasksRepository: TasksRepository,
		private projectsRepository: ProjectsRepository,
	) {}
	async execute({
		projectId,
		status,
		title,
	}: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
		const projectExists = await this.projectsRepository.findById(projectId);

		if (!projectExists) {
			throw new ResourceNotFoundError();
		}
		console.log(
			"Creating task for project:",
			projectId,
			"with title:",
			title,
			"and status:",
			status,
		);
		const task = await this.tasksRepository.create({
			projectId,
			title,
			status,
		});

		return {
			task,
		};
	}
}
