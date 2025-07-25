import { ProjectsRepository } from "@/application/repositories/projects-repository";
import { UsersRepository } from "@/application/repositories/users-repository";
import { prisma } from "@/infra/lib/prisma";
import { Prisma, User } from "@prisma/client";

export class PrismaProjectsRepository implements ProjectsRepository {

  async create(data: Prisma.ProjectCreateInput) {
    const project = await prisma.project.create({
      data,
    });

    return project;
  }
  
  
}