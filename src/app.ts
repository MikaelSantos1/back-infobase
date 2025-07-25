import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { usersRoutes } from "@/infra/http/controllers/users/routes";
import { env } from "./env";
import { projectRoutes } from "./infra/http/controllers/projects/routes";
export const app = fastify();

app.register(fastifyCors);

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	sign: {
		expiresIn: "8h",
	},
});
app.register(usersRoutes);
app.register(projectRoutes);

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: "Validation error.", issues: error.format() });
	}

	if (env.NODE_ENV !== "production") {
		console.error(error);
	} else {
		// TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
	}

	return reply.status(500).send({ message: "Internal server error." });
});
