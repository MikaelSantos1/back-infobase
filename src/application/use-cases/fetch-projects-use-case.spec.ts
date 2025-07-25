import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryProjectsRepository } from "@/test/repositories/in-memory-projects-repository";
import { FetchProjectsUseCase } from "./fetch-projects-use-case";

let projectsRepository: InMemoryProjectsRepository;
let sut: FetchProjectsUseCase;

describe("Fetch Project Use Case", () => {
	beforeEach(() => {
		projectsRepository = new InMemoryProjectsRepository();
		sut = new FetchProjectsUseCase(projectsRepository);
	});

	it("should to Fetch project", async () => {
		const createdProject = await projectsRepository.create({
			name: "JavaScript Project",
		});
		const { projects } = await sut.execute();

		expect(projects).toContainEqual(
			expect.objectContaining({ id: createdProject.id }),
		);
		expect(projects[0].name).toBe("JavaScript Project");
	});
});
