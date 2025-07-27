import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";
import { makeProject } from "@/test/factories/make-project";

describe("Fetch users (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to fetch users", async () => {
		const { token } = await createAndAuthenticateUser(app, "COLLABORATOR");
	

		const response = await request(app.server)
			.get(`/users`)
			.set("Authorization", `Bearer ${token}`);

	
		expect(response.statusCode).toEqual(200);
	});
});
