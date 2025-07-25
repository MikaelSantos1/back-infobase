import type { Project } from "@prisma/client";
import type { ProjectsRepository } from "../repositories/projects-repository";

interface CreateProjectUseCaseRequest {
	name: string;
}

interface CreateProjectUseCaseResponse {
	project: Project;
}

export class CreateProjectUseCase {
	constructor(private projectsRepository: ProjectsRepository) {}

	async execute({
		name,
	}: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {
		const project = await this.projectsRepository.create({
			name,
		});

		return {
			project,
		};
	}
}
