import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryProjectsRepository } from "@/test/repositories/in-memory-projects-repository";

import { ChangeTaskStatusUseCase } from "./change-task-status-use-case";
import { InMemoryTasksRepository } from "@/test/repositories/in-memory-tasks-repository";

let tasksRepository: InMemoryTasksRepository;
let projectsRepository: InMemoryProjectsRepository;
let sut: ChangeTaskStatusUseCase;

describe("Change Task Status Use Case", () => {
	beforeEach(() => {
		tasksRepository = new InMemoryTasksRepository();
        projectsRepository = new InMemoryProjectsRepository();
		sut = new ChangeTaskStatusUseCase(tasksRepository);
	});

	it("should be able to complete a task ", async () => {
		const createdProject = await projectsRepository.create({
			name: "JavaScript Project",
		});
        const createdTask = await tasksRepository.create({
            title: "New Task",
            status: "IN_PROGRESS",
            projectId: createdProject.id,
        });

		const { task } = await sut.execute({
            
			taskId: createdTask.id,
            status: "COMPLETED",
		});


		expect(task.status).toBe("COMPLETED");
	});
});
