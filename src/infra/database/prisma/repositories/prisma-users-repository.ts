import { UsersRepository } from "@/application/repositories/users-repository";
import { prisma } from "@/infra/lib/prisma";
import { Prisma, User } from "@prisma/client";

export class PrismaUsersRepository implements UsersRepository {

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
  
  async disable(userId: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        is_active: false,
      },
    });
  }
}