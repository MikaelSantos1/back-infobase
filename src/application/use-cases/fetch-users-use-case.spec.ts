import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { FetchUsersUseCase } from "./fetch-users-use-case";

let usersRepository: InMemoryUsersRepository;
let sut: FetchUsersUseCase;

describe("Fetch Users Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new FetchUsersUseCase(usersRepository);
	});

	it("should to fetch users", async () => {
		const user = await usersRepository.create({
			email: "email-test",
			name: "user-test",
			password_hash: "asdsa",
			role: "MANAGER",
			id: randomUUID(),
		});
		const { users } = await sut.execute({ userId: undefined });

		expect(users).toContainEqual(expect.objectContaining({ id: user.id }));
		expect(users[0].name).toBe("user-test");
	});
});
