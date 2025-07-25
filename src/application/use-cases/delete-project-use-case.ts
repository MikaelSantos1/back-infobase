import type { ProjectsRepository } from "../repositories/projects-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteProjectUseCaseRequest {
	projectId: string;
}

type DeleteProjectUseCaseResponse = {};

export class DeleteProjectUseCase {
	constructor(private projectsRepository: ProjectsRepository) {}

	async execute({
		projectId,
	}: DeleteProjectUseCaseRequest): Promise<DeleteProjectUseCaseResponse> {
		const project = await this.projectsRepository.findById(projectId);
		if (!project) {
			throw new ResourceNotFoundError();
		}

		await this.projectsRepository.delete(project.id);

		return {};
	}
}
