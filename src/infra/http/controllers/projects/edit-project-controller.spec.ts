import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";
import { makeProject } from "@/test/factories/make-project";

describe("Edit Project (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to edit project if user role is admin", async () => {
		const { token } = await createAndAuthenticateUser(app, "ADMIN");
		const project = await makeProject();

		const response = await request(app.server)
			.put(`/project/${project.id}`)
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "project updated test",
			});

		expect(response.statusCode).toEqual(200);
	});
	it("should NOT be able to edit project if user role is not admin", async () => {
		const { token } = await createAndAuthenticateUser(app, "COLLABORATOR");
		const project = await makeProject();

		const response = await request(app.server)
			.put(`/project/${project.id}`)
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "Project test",
			});

		expect(response.statusCode).toEqual(403);
	});
});
