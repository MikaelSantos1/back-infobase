import type { FastifyInstance } from "fastify";
import { jwtAuth } from "../../middlewares/jwt-auth";
import { verifyUserRole } from "../../middlewares/verify-role";
import { authenticate } from "./authenticate-user-controller";
import { register } from "./create-user-controller";

export async function usersRoutes(app: FastifyInstance) {
	app.post(
		"/users",
		{ onRequest: jwtAuth, preHandler: [verifyUserRole(["ADMIN"])] },
		register,
	);
	app.post("/users/sign-in", authenticate);
}
