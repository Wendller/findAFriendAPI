import { describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { CreatePetRequirementInput } from "./create-pet-requirement-input";
import { petRequirementFactory } from "../tests/factories/pets-factory";

describe("Create Pet Requirement Input", () => {
  it("should validate when valid params", () => {
    const params = petRequirementFactory.build();
    const input = new CreatePetRequirementInput(params);

    expect(input).toEqual(
      expect.objectContaining({
        title: params.title,
      })
    );
  });

  it("should validate when invalid params", () => {
    const params = petRequirementFactory.build({
      title: faker.number.int(),
    });

    expect(() => new CreatePetRequirementInput(params)).throw(Error);
  });

  it("should validate when missing params", () => {
    expect(() => new CreatePetRequirementInput({})).throw(Error);
  });
});
