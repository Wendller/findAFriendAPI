import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";

describe("Refresh Token (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to refresh token", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await request(app.server).post("/orgs").send({
      name: faker.person.fullName(),
      email,
      password,
      postalCode: "89010025",
      address: faker.location.streetAddress(),
      whatsapp: faker.phone.number(),
    });

    const authResponse = await request(app.server).post("/orgs/sessions").send({
      email,
      password,
    });

    const cookies = authResponse.get("Set-Cookie");

    const response = await request(app.server)
      .patch("/orgs/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
