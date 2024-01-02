import { describe, expect, vi, it } from "vitest";
import { getLocationByCEP } from "./brasil-api";

describe("Get location by cep - Brasil api adapter", () => {
  it("should be able to return a location", async () => {
    const httpExpectedResponse = {
      postalCode: "89010025",
      stateCode: "SC",
      city: "Blumenau",
      street: "Rua Doutor Luiz de Freitas Melro",
      longitude: "-49.0629788",
      latitude: "-26.9244749",
    };

    const getLocation = new getLocationByCEP();
    getLocation.exec = vi.fn().mockResolvedValue(httpExpectedResponse);

    const response = await getLocation.exec("89010025");

    expect(response).toEqual(httpExpectedResponse);
    expect(getLocation.exec).toBeCalled();
  });
});
