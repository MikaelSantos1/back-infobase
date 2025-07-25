import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { prisma } from "@/infra/lib/prisma";

export async function makeProject() {
	const randomSuffix = randomUUID().slice(0, 8);
	const project = await prisma.project.create({
		data: {
			name: `Project test ${randomSuffix}`,
		},
	});
	return project;
}
