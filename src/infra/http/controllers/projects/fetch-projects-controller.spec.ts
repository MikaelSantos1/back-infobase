import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";
import { makeProject } from "@/test/factories/make-project";

describe("Fetch Projects (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to fetch projects", async () => {
		const { token } = await createAndAuthenticateUser(app, "ADMIN");
		await Promise.all([makeProject(), makeProject()]);

		const response = await request(app.server)
			.get(`/projects`)
			.set("Authorization", `Bearer ${token}`);

		expect(response.body.projects).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(String),
					name: expect.stringContaining("Project test"),
				}),
			]),
		);
		expect(response.statusCode).toEqual(200);
	});
});
