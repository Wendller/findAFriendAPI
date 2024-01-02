import { IGetLocationByCEPPort } from "@/core/ports/get-location-by-cep";
import { HTTPAxiosAdapter } from "../http/axios";
import { LocationRequestError } from "../../errors/location-request-error";

interface IBRASILAPIResponse {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  location: {
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
}

export class getLocationByCEP implements IGetLocationByCEPPort {
  async exec(postalCode: string) {
    const BRASIL_API_URL = `https://brasilapi.com.br/api/cep/v2/${postalCode}`;

    const client = new HTTPAxiosAdapter(BRASIL_API_URL).client;

    try {
      const locationRaw: IBRASILAPIResponse = await client
        .get(BRASIL_API_URL)
        .then((response) => {
          return response.data;
        });

      const location = {
        postalCode: locationRaw.cep,
        street: locationRaw.street,
        city: locationRaw.city,
        stateCode: locationRaw.state,
        latitude: locationRaw.location.coordinates.latitude,
        longitude: locationRaw.location.coordinates.longitude,
      };

      return location;
    } catch (err) {
      throw new LocationRequestError();
    }
  }
}
