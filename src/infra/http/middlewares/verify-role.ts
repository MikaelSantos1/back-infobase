import type { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(
	allowedRoles: Array<"ADMIN" | "MANAGER" | "COLLABORATOR">,
) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const { role } = request.user;

		if (!allowedRoles.includes(role)) {
			return reply
				.status(401)
				.send({ message: "user does not have permission" });
		}
	};
}
