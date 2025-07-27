import type { FastifyInstance } from "fastify";
import { jwtAuth } from "../../middlewares/jwt-auth";
import { verifyUserRole } from "../../middlewares/verify-role";
import { authenticate } from "./authenticate-user-controller";
import { register } from "./create-user-controller";
import { disable } from "./disable-user-use-case-controller";
import { edit } from "./edit-user-controller";
import { fetchUsers } from "./fetch-users-controller";

export async function usersRoutes(app: FastifyInstance) {
	app.post(
		"/users",
		{ onRequest: jwtAuth, preHandler: [verifyUserRole(["ADMIN"])] },
		register,
	);
	app.delete(
		`/user/:userId`,
		{ onRequest: jwtAuth, preHandler: [verifyUserRole(["ADMIN"])] },
		disable,
	);
	app.post("/users/sign-in", authenticate);
	app.get("/users", { onRequest: jwtAuth }, fetchUsers);
	app.put(
		"/users/:email",
		{ onRequest: jwtAuth, preHandler: [verifyUserRole(["ADMIN"])] },
		edit,
	);
}
