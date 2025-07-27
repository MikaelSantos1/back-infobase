import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/helpers/create-and-authenticate-user";
import { makeProject } from "@/test/factories/make-project";

describe("Create Task (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create  task if user role is manager", async () => {
    const { token } = await createAndAuthenticateUser(app, "MANAGER");
    const project = await makeProject();

    const response = await request(app.server)
      .post("/task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Task",
        projectId: project.id,
        status: "IN_PROGRESS",
      });
    expect(response.body).toHaveProperty("task");
    expect(response.body.task).toMatchObject({
      title: "Task",
      projectId: project.id,
      status: "IN_PROGRESS",
    });

    expect(response.statusCode).toEqual(201);
  });

  it("should NOT be able to create task if user role is not collaborator", async () => {
    const { token } = await createAndAuthenticateUser(app, "COLLABORATOR");
    const project = await makeProject();
    const response = await request(app.server)
      .post("/task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Task",
        projectId: project.id,
        status: "IN_PROGRESS",
      });
    expect(response.statusCode).toEqual(403);
  });
});
