import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { faker } from "@faker-js/faker";

describe("Sign Up (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to sign up an org", async () => {
    const response = await request(app.server).post("/orgs").send({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      postalCode: "01001000",
      address: faker.location.streetAddress(),
      whatsapp: faker.phone.number(),
    });

    console.log(response.body);

    expect(response.statusCode).toEqual(201);
  });
});
