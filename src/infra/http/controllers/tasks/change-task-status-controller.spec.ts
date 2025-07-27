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

  it("should be able to change task status", async () => {
    const { token } = await createAndAuthenticateUser(app, "MANAGER");
    const project = await makeProject();

    const responseCreateTask = await request(app.server)
      .post("/task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Task",
        projectId: project.id,
        status: "IN_PROGRESS",
      });
    const taskId = responseCreateTask.body.task.id;

       const response = await request(app.server)
      .put(`/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
   
        status: "COMPLETED",
      });

    expect(response.body).toHaveProperty("task");
    expect(response.body.task).toMatchObject({
      title: "Task",
      projectId: project.id,
      status: "COMPLETED",
    });

    expect(response.statusCode).toEqual(200);
  });


});
