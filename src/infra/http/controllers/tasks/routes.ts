import type { FastifyInstance } from "fastify";
import { jwtAuth } from "../../middlewares/jwt-auth";
import { verifyUserRole } from "../../middlewares/verify-role";
import { changeTaskStatus } from "./change-task-status-controller";
import { create } from "./create-task-controller";

export async function tasksRoutes(app: FastifyInstance) {
	app.addHook("onRequest", jwtAuth);
	app.post(
		"/task",
		{ preHandler: [verifyUserRole(["ADMIN", "MANAGER"])] },
		create,
	);
	app.put("/task/:taskId", changeTaskStatus);
}
