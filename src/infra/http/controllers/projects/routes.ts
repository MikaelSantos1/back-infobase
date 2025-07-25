import type { FastifyInstance } from "fastify";

import { jwtAuth } from "../../middlewares/jwt-auth";
import { verifyUserRole } from "../../middlewares/verify-role";
import { create } from "./create-project-controller";
import { deleteProject } from "./delete-project-controller";
import { edit } from "./edit-project-controller";
import { fetchProjects } from "./fetch-projects-controller";

export async function projectRoutes(app: FastifyInstance) {
	app.addHook("onRequest", jwtAuth);
	app.get(
		"/projects",
		fetchProjects
	);
	app.post(
		"/project",
		{ preHandler: [verifyUserRole(["ADMIN", "MANAGER"])] },
		create,
	);
	app.put(
		"/project/:projectId",
		{ preHandler: [verifyUserRole(["ADMIN", "MANAGER"])] },
		edit,
	);
	app.delete(
		"/project/:projectId",
		{ preHandler: [verifyUserRole(["ADMIN"])] },
		deleteProject,
	);
}
