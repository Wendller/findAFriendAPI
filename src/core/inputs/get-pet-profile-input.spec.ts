import { describe, expect, it } from "vitest";
import { randomUUID } from "crypto";
import { GetPetProfileInput } from "./get-pet-profile-input";

describe("Get Pet Profile Input", () => {
  it("should validate when valid params", () => {
    const params = { petId: randomUUID() };
    const input = new GetPetProfileInput(params);

    expect(input).toEqual(
      expect.objectContaining({
        petId: params.petId,
      })
    );
  });

  it("should validate when invalid params", () => {
    const params = { petId: "invalid" };

    expect(() => new GetPetProfileInput(params)).throw(Error);
  });

  it("should validate when missing params", () => {
    expect(() => new GetPetProfileInput({})).throw(Error);
  });
});
