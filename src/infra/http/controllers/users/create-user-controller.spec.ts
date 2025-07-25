import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";

describe("Create user (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create if user role is admin", async () => {
		const { token } = await createAndAuthenticateUser(app, "ADMIN");

		const response = await request(app.server)
			.post("/users")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "User test",
				email: "user-test@test.com",
				password: "123456",
			});

		expect(response.statusCode).toEqual(201);
	});
	it("should NOT be able to create user if user role is not admin", async () => {
		const { token } = await createAndAuthenticateUser(app, "COLLABORATOR");

		const response = await request(app.server)
			.post("/users")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "User test",
				email: "user-fail@test.com",
				password: "123456",
			});

		expect(response.statusCode).toEqual(401);
	});
});
