import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user-use-case";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("Create user Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new CreateUserUseCase(usersRepository);
	});

	it("should create a user", async () => {
		const { user } = await sut.execute({
			name: "John Doe",
			email: "johndoe@example.com",
			password: "123456",
			role: "ADMIN",
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("should not be able to register with same email twice", async () => {
		const email = "johndoe@example.com";

		await sut.execute({
			name: "John Doe",
			email,
			password: "123456",
			role: "ADMIN",
		});

		await expect(() =>
			sut.execute({
				name: "John Doe",
				email,
				password: "123456",
				role: "ADMIN",
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});
});
