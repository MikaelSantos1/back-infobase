import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";

describe("Create Project (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to create  project if user role is admin", async () => {
		const { token } = await createAndAuthenticateUser(app, "ADMIN");

		const response = await request(app.server)
			.post("/project")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "Project test",
			});
		expect(response.body).toHaveProperty("project");
		expect(response.body.project).toMatchObject({
			name: "Project test",
		});

		expect(response.statusCode).toEqual(201);
	});
	it("should NOT be able to create project if user role is not admin", async () => {
		const { token } = await createAndAuthenticateUser(app, "COLLABORATOR");

		const response = await request(app.server)
			.post("/project")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "Project test",
			});

		expect(response.statusCode).toEqual(401);
	});
});
