import { $Enums, type Prisma, type Project, User } from "@prisma/client";
import { randomUUID } from "crypto";
import type { ProjectsRepository } from "@/application/repositories/projects-repository";

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
		if (!project) {
			return null;
		}
		return project;
	}

	async save(project: Project) {
		const projectIndex = this.items.findIndex((item) => item.id === project.id);

		if (projectIndex >= 0) {
			this.items[projectIndex] = project;
		}

		return project;
	}
	async delete(id: string): Promise<void> {
		const projectIndex = this.items.findIndex((item) => item.id === id);

		if (projectIndex >= 0) {
			this.items.splice(projectIndex, 1);
		}
	}
}
