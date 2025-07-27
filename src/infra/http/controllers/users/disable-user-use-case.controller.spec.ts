import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";
import { makeUser } from "@/test/factories/make-user";

describe("Create user (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to disable  user if role is admin", async () => {
        const user= await makeUser()
		const { token } = await createAndAuthenticateUser(app, "ADMIN");

		const response = await request(app.server)
			.delete(`/user/${user.id}`)
			.set("Authorization", `Bearer ${token}`)
		

		expect(response.statusCode).toEqual(200);
	});
	it("should NOT be able to disable user if user role is not admin", async () => {
		  const user= await makeUser()
		const { token } = await createAndAuthenticateUser(app, "COLLABORATOR");

		const response = await request(app.server)
			.del(`/user/${user.id}`)
			.set("Authorization", `Bearer ${token}`)
		

		expect(response.statusCode).toEqual(403);
	});
});
