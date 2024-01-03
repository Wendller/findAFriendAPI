import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateOrg } from "@/web/utils/tests/create-and-authenticate-org";
import { faker } from "@faker-js/faker";

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a pet", async () => {
    const { token, org } = await createAndAuthenticateOrg(app);
    const filePath = `${__dirname}/test-files/pet.jpg`;

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .attach("images", filePath)
      .field("name", faker.person.firstName())
      .field("size", "medium")
      .field("age", "baby")
      .field("description", faker.company.catchPhrase())
      .field("energyLevel", "medium")
      .field("environmentType", "small")
      .field("independencyLevel", "low")
      .field("orgId", org.id);

    expect(response.statusCode).toEqual(201);
  });
});
