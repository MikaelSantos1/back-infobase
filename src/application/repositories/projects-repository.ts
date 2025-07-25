import { type Prisma, type Project, User } from "@prisma/client";

export interface ProjectsRepository {
	create(data: Prisma.ProjectCreateInput): Promise<Project>;
	findById(id: string): Promise<Project | null>;
	save(project: Project): Promise<Project>;
	delete(id: string): Promise<void>;
}
