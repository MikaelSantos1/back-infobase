import type { FastifyInstance } from "fastify";

import { jwtAuth } from "../../middlewares/jwt-auth";
import { create } from "./create-project-controller";
import { edit } from "./edit-project-controller";
import { deleteProject } from "./delete-project-controller";

export async function projectRoutes(app: FastifyInstance) {
	app.addHook("onRequest", jwtAuth);
	app.post("/project", create);
	app.put("/project/:projectId", edit);
	app.delete("/project/:projectId", deleteProject);
}
