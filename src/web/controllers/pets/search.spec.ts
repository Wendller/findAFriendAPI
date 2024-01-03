import request from "supertest";
import { app } from "@/app";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateOrg } from "@/web/utils/tests/create-and-authenticate-org";
import { faker } from "@faker-js/faker";
import { prisma } from "@/core/config/prisma";

describe("Search Pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await prisma.org.deleteMany();
  });

  it("should be able to search for pets with filters", async () => {
    const { token, org } = await createAndAuthenticateOrg(
      app,
      "findyourpetorg@mail.com"
    );
    const filePath = `${__dirname}/test-files/pet.jpg`;
    const firstPetName = faker.person.firstName();

    const city = org.city;
    const independencyLevel = "low";
    const size = "small";
    const age = "baby";
    const energyLevel = "high";

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .attach("images", filePath)
      .field("name", firstPetName)
      .field("size", size)
      .field("age", age)
      .field("description", faker.company.catchPhrase())
      .field("energyLevel", energyLevel)
      .field("environmentType", "small")
      .field("independencyLevel", independencyLevel)
      .field("orgId", org.id);

    await request(app.server)
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

    const response = await request(app.server)
      .get("/pets")
      .query({ city, age, independencyLevel, energyLevel, size })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(1);
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: firstPetName, city: org.city }),
    ]);
  });

  it("should be able to search for pets by city", async () => {
    const { token, org } = await createAndAuthenticateOrg(
      app,
      "welovepetsorg@mail.com"
    );
    const filePath = `${__dirname}/test-files/pet.jpg`;

    const firstPetName = faker.person.firstName();
    const secondPetName = faker.person.firstName();
    const city = org.city;

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .attach("images", filePath)
      .field("name", firstPetName)
      .field("size", "medium")
      .field("age", "baby")
      .field("description", faker.company.catchPhrase())
      .field("energyLevel", "medium")
      .field("environmentType", "small")
      .field("independencyLevel", "low")
      .field("orgId", org.id);

    await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .attach("images", filePath)
      .field("name", secondPetName)
      .field("size", "medium")
      .field("age", "baby")
      .field("description", faker.company.catchPhrase())
      .field("energyLevel", "medium")
      .field("environmentType", "small")
      .field("independencyLevel", "low")
      .field("orgId", org.id);

    const response = await request(app.server)
      .get("/pets")
      .query({ city })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(2);
    expect(response.body.pets).toEqual([
      expect.objectContaining({ name: firstPetName, city: org.city }),
      expect.objectContaining({ name: secondPetName, city: org.city }),
    ]);
  });
});
