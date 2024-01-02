import { describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { CreateOrgInput } from "./create-org-input";
import { orgFactory } from "../utils/tests/factories/orgs-factory";

describe("Create Org Input", () => {
  it("should validate when valid params", () => {
    const params = orgFactory.build();
    const input = new CreateOrgInput(params);

    expect(input).toEqual(
      expect.objectContaining({
        name: params.name,
        email: params.email,
        password: params.password,
        postalCode: params.postalCode,
        address: params.address,
        whatsapp: params.whatsapp,
      })
    );
  });

  it("should validate when invalid params", () => {
    const params = orgFactory.build({
      name: faker.number.int(),
      email: faker.number.int(),
      password: faker.number.int(),
      postalCode: faker.number.int(),
      address: faker.number.int(),
      whatsapp: faker.number.int(),
    });

    expect(() => new CreateOrgInput(params)).throw(Error);
  });

  it("should validate when missing params", () => {
    expect(() => new CreateOrgInput({})).throw(Error);
  });
});
