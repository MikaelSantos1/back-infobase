import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";
import { CreateUserUseCase } from "@/application/use-cases/create-user-use-case";


export function makeCreateUserUseCase() {
  const prismaUserRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(prismaUserRepository);
  return createUserUseCase;
}