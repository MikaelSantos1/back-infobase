import { type Prisma, type Task, TaskStatus } from "@prisma/client";
import { randomUUID } from "crypto";

import type { TasksRepository } from "@/application/repositories/tasks-repostory";

export class InMemoryTasksRepository implements TasksRepository {
	public items: Task[] = [];
	async create(data: Prisma.TaskUncheckedCreateInput) {
		const task: Task = {
			id: randomUUID(),
			title: data.title,
			projectId: data.projectId,
			status: TaskStatus.IN_PROGRESS,
			created_at: new Date(),
			updated_at: new Date(),
		};
		this.items.push(task);
		return task;
	}
	async findById(id: string): Promise<Task | null> {
		const task = this.items.find((item) => item.id === id);
		if (!task) {
			return null;
		}
		return task;
	}
	async save(task: Task) {
		const taskIndex = this.items.findIndex((item) => item.id === task.id);

		if (taskIndex >= 0) {
			this.items[taskIndex] = task;
		}

		return task;
	}
}
