import { Project } from "@prisma/client";
import { ProjectsRepository } from "../repositories/projects-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface EditProjectUseCaseRequest {
    name: string;
    projectId: string;
}

interface EditProjectUseCaseResponse {
  project: Project;
}

export class EditProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({projectId,name}: EditProjectUseCaseRequest): Promise<EditProjectUseCaseResponse> {
    const project = await this.projectsRepository.findById(projectId)
    if (!project) {
      throw new ResourceNotFoundError()
    }
    project.name = name;
    
    await this.projectsRepository.save(project);

    return {
      project
    };
  }
}