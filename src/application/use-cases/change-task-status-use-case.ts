import type { Task, TaskStatus } from "@prisma/client";
import type { TasksRepository } from "../repositories/tasks-repostory";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ChangeTaskStatusUseCaseRequest {
	taskId: string;
	status: TaskStatus;
}

interface ChangeTaskStatusUseCaseResponse {
	task: Task;
}

export class ChangeTaskStatusUseCase {
	constructor(private tasksRepository: TasksRepository) {}
	async execute({
		status,
		taskId,
	}: ChangeTaskStatusUseCaseRequest): Promise<ChangeTaskStatusUseCaseResponse> {
		const task = await this.tasksRepository.findById(taskId);

		if (!task) {
			throw new ResourceNotFoundError();
		}
		task.status = status;
		await this.tasksRepository.save(task);

		return {
			task,
		};
	}
}
