import type { Prisma, Project, Task } from "@prisma/client";
import type { TasksRepository } from "@/application/repositories/tasks-repostory";
import { prisma } from "@/infra/lib/prisma";

export class PrismaTasksRepository implements TasksRepository {
	async findById(id: string): Promise<Task | null> {
		const task = await prisma.task.findUnique({
			where: { id },
		});
		return task;
	}

	async create(data: Prisma.TaskUncheckedCreateInput) {
		const task = await prisma.task.create({
			data,
		});

		return task;
	}
	async save(task: Task): Promise<Task> {
		const updatedTask = await prisma.task.update({
			where: { id: task.id },
			data: task,
		});
		return updatedTask;
	}
}
