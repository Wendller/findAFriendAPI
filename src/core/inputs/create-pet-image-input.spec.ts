import { describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { CreatePetImageInput } from "./create-pet-image-input";
import { petImageFactory } from "../tests/factories/pets-factory";

describe("Create Pet Image Input", () => {
  it("should validate when valid params", () => {
    const params = petImageFactory.build();
    const input = new CreatePetImageInput(params);

    expect(input).toEqual(
      expect.objectContaining({
        imageUrl: params.imageUrl,
      })
    );
  });

  it("should validate when invalid params", () => {
    const params = petImageFactory.build({
      imageUrl: faker.number.int(),
    });

    expect(() => new CreatePetImageInput(params)).throw(Error);
  });

  it("should validate when missing params", () => {
    expect(() => new CreatePetImageInput({})).throw(Error);
  });
});
