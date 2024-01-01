import { describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { CreatePetInput } from "./create-pet-input";
import { petFactory } from "../tests/factories/pets-factory";
import { SearchPetsInput } from "./search-pets-input";

describe("Search Pets Input", () => {
  it("should validate when valid params", () => {
    const params = {
      city: faker.location.city(),
      age: "baby",
      size: "medium",
      independencyLevel: "low",
      energyLevel: "medium",
    };

    const input = new SearchPetsInput(params);

    expect(input).toEqual(
      expect.objectContaining({
        city: params.city,
        age: params.age,
        size: params.size,
        independencyLevel: params.independencyLevel,
        energyLevel: params.energyLevel,
      })
    );
  });

  it("should validate when invalid params", () => {
    const params = {
      city: faker.number.int(),
      age: faker.number.int(),
      size: faker.number.int(),
      energyLevel: faker.number.int(),
      independencyLevel: faker.number.int(),
    };

    expect(() => new SearchPetsInput(params)).throw(Error);
  });

  it("should validate when missing params", () => {
    expect(() => new SearchPetsInput({})).throw(Error);
  });
});
