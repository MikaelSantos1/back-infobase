import { ProjectsRepository } from "@/application/repositories/projects-repository";

import { Prisma, $Enums, User, Project } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryProjectsRepository implements ProjectsRepository {
 
  public items: Project[] = [];
  async create(data: Prisma.ProjectCreateInput) {
    const project: Project = {
      id: randomUUID(),
      name: data.name,

      created_at: new Date(),
      updated_at: new Date(),
    };
    this.items.push(project);
    return project;
  }
async findById(id: string): Promise<Project | null> {
  const project = this.items.find((item) => item.id === id);
  if(!project) {
    return null;
  }
  return project 
}

  async save(project: Project) {
    const projectIndex = this.items.findIndex((item) => item.id === project.id)

    if (projectIndex >= 0) {
      this.items[projectIndex] = project
    }

    return project
  }
 
}