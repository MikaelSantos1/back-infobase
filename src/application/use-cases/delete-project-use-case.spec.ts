import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryProjectsRepository } from "@/test/repositories/in-memory-projects-repository";
import { DeleteProjectUseCase } from "./delete-project-use-case";

let projectsRepository: InMemoryProjectsRepository;
let sut: DeleteProjectUseCase;

describe("Delete Project Use Case", () => {
	beforeEach(() => {
		projectsRepository = new InMemoryProjectsRepository();
		sut = new DeleteProjectUseCase(projectsRepository);
	});

	it("should to delete project", async () => {
		const createdProject = await projectsRepository.create({
			name: "JavaScript Project",
		});
		await sut.execute({
			projectId: createdProject.id,
		});
		const project = await projectsRepository.findById(createdProject.id);
		expect(project).toBeNull();
	});
});
