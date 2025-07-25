import { type Prisma, type Project, User } from "@prisma/client";
import type { ProjectsRepository } from "@/application/repositories/projects-repository";
import { prisma } from "@/infra/lib/prisma";

export class PrismaProjectsRepository implements ProjectsRepository {
	async findById(id: string): Promise<Project | null> {
		const project = await prisma.project.findUnique({
			where: { id },
		});
		return project;
	}
	async save(project: Project): Promise<Project> {
		const updatedProject = await prisma.project.update({
			where: { id: project.id },
			data: project,
		});
		return updatedProject;
	}
	async create(data: Prisma.ProjectCreateInput) {
		const project = await prisma.project.create({
			data,
		});

		return project;
	}
	async delete(id: string): Promise<void> {
		await prisma.project.delete({
			where: { id },
		});
	}
}
