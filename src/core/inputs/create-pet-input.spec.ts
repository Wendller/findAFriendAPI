import { describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { CreatePetInput } from "./create-pet-input";
import { petFactory } from "../tests/factories/pets-factory";

describe("Create Pet Input", () => {
  it("should validate when valid params", () => {
    const params = petFactory.build();
    const input = new CreatePetInput(params);

    expect(input).toEqual(
      expect.objectContaining({
        name: params.name,
        age: params.age,
        size: params.size,
        description: params.description,
        energyLevel: params.energyLevel,
        environmentType: params.environmentType,
        images: params.images,
        independencyLevel: params.independencyLevel,
        orgId: params.orgId,
        requirements: params.requirements,
      })
    );
  });

  it("should validate when invalid params", () => {
    const params = petFactory.build({
      name: faker.number.int(),
      age: faker.number.int(),
      size: faker.number.int(),
      description: faker.number.int(),
      energyLevel: faker.number.int(),
      environmentType: faker.number.int(),
      images: faker.number.int(),
      independencyLevel: faker.number.int(),
      orgId: faker.number.int(),
      requirements: faker.number.int(),
    });

    expect(() => new CreatePetInput(params)).throw(Error);
  });

  it("should validate when missing params", () => {
    expect(() => new CreatePetInput({})).throw(Error);
  });
});
