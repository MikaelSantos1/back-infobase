import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { makeUser } from "@/test/factories/make-user";

describe("Authenticate (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to authenticate", async () => {
		const user = await makeUser();

		const response = await request(app.server).post("/users/sign-in").send({
			email: user.email,
			password: "123456",
		});

		expect(response.statusCode).toEqual(200);
		expect(response.body.token).toEqual(expect.any(String));
	});
});
