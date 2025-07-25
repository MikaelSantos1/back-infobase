import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryProjectsRepository } from "@/test/repositories/in-memory-projects-repository";

import { InMemoryTasksRepository } from "@/test/repositories/in-memory-tasks-repository";
import { CreateTaskUseCase } from "./create-task-use-case";

let tasksRepository: InMemoryTasksRepository;
let projectsRepository: InMemoryProjectsRepository;
let sut: CreateTaskUseCase;

describe("Create Task Use Case", () => {
	beforeEach(() => {
		tasksRepository = new InMemoryTasksRepository();
		projectsRepository = new InMemoryProjectsRepository();
		sut = new CreateTaskUseCase(tasksRepository, projectsRepository);
	});

	it("should to create task", async () => {
		const project = await projectsRepository.create({
			name: "JavaScript Project",
		});

		const { task } = await sut.execute({
			projectId: project.id,
			status: "IN_PROGRESS",
			title: "New Task",
		});

		expect(task.id).toEqual(expect.any(String));
	});
});
