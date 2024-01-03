import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateOrg } from "@/web/utils/tests/create-and-authenticate-org";
import { faker } from "@faker-js/faker";

describe("Pet Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get an user profile", async () => {
    const { token, org } = await createAndAuthenticateOrg(app);

    const filePath = `${__dirname}/test-files/pet.jpg`;

    const petResponse = await request(app.server)
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

    const petId = petResponse.body.pet.id;
    const petName = petResponse.body.pet.name;

    const response = await request(app.server).get(`/pets/${petId}`).send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pet).toEqual(
      expect.objectContaining({ id: petId, name: petName })
    );
  });
});
