
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UsersRepository } from "../repositories/users-repository";

interface EditUserUseCaseRequest {
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "COLLABORATOR";
  is_active: boolean;
}

interface EditUserUseCaseResponse {}

export class EditUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    role,
    is_active,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    Object.assign(user, {
      name,
      email,
      role,
      is_active,
    });

    await this.usersRepository.save(user);

    return {};
  }
}
