import type { Project } from "@prisma/client";
import type { ProjectsRepository } from "../repositories/projects-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

type FetchProjectUseCaseRequest = {};

interface FetchProjectUseCaseResponse {
	projects: Project[];
}

export class FetchProjectsUseCase {
	constructor(private projectsRepository: ProjectsRepository) {}

	async execute(): Promise<FetchProjectUseCaseResponse> {
		const projects = await this.projectsRepository.fetchProjects();

		return {
			projects: projects,
		};
	}
}
