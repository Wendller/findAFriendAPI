import { describe, expect, vi, it } from "vitest";
import { getLocationByCEPAdapter } from "./via-cep";

describe("Get location by cep - VIACEP adapter", () => {
  it("should be able to return a location", async () => {
    const httpExpectedResponse = {
      street: "Praça da Sé",
      complement: "lado ímpar",
      neighborhood: "Sé",
      city: "São Paulo",
      stateCode: "SP",
      IBGECode: "3550308",
      postalCode: "01001-000",
    };

    const getLocation = new getLocationByCEPAdapter();
    getLocation.exec = vi.fn().mockResolvedValue(httpExpectedResponse);

    const response = await getLocation.exec("01001000");

    expect(response).toEqual(httpExpectedResponse);
    expect(getLocation.exec).toBeCalled();
  });
});
