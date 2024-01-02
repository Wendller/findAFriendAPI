import { app } from "@/app";
import { faker } from "@faker-js/faker";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Sign In (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate and sign in an org", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await request(app.server).post("/orgs").send({
      name: faker.person.fullName(),
      email,
      password,
      postalCode: "01001000",
      address: faker.location.streetAddress(),
      whatsapp: faker.phone.number(),
    });

    const response = await request(app.server).post("/sessions").send({
      email,
      password,
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        org: expect.objectContaining({ email: email }),
        token: expect.any(String),
      })
    );
  });
});
