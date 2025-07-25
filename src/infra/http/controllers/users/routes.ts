import type { FastifyInstance } from "fastify";
import { jwtAuth } from "../../middlewares/jwt-auth";
import { authenticate } from "./authenticate-user-controller";
import { register } from "./create-user-controller";

export async function usersRoutes(app: FastifyInstance) {
	app.post("/users", { onRequest: jwtAuth }, register);
	app.post("/users/sign-in", authenticate);
}
