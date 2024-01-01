import { describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { petImageFactory } from "../tests/factories/pets-factory";
import { AuthenticateInput } from "./authenticate-input";

describe("Authenticate Input", () => {
  it("should validate when valid params", () => {
    const params = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const input = new AuthenticateInput(params);

    expect(input).toEqual(
      expect.objectContaining({
        email: params.email,
        password: params.password,
      })
    );
  });

  it("should validate when invalid params", () => {
    const params = petImageFactory.build({
      imageUrl: faker.number.int(),
    });

    expect(() => new AuthenticateInput(params)).throw(Error);
  });

  it("should validate when missing params", () => {
    expect(() => new AuthenticateInput({})).throw(Error);
  });
});
