import { IGetLocationByCEPPort } from "@/core/ports/get-location-by-cep";
import { HTTPAxiosAdapter } from "../http/axios";
import { LocationRequestError } from "../../errors/location-request-error";

interface IViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export class getLocationByCEPAdapter implements IGetLocationByCEPPort {
  async exec(postalCode: string) {
    const VIA_CEP_URL = `https://viacep.com.br/ws/${postalCode}/json/`;

    const client = new HTTPAxiosAdapter(VIA_CEP_URL).client;

    try {
      const locationRaw: IViaCepResponse = await client
        .get(VIA_CEP_URL)
        .then((response) => {
          return response.data;
        });

      const location = {
        street: locationRaw.logradouro,
        complement: locationRaw.complemento,
        neighborhood: locationRaw.bairro,
        city: locationRaw.localidade,
        stateCode: locationRaw.uf,
        IBGECode: locationRaw.ibge,
        postalCode: locationRaw.cep,
      };

      return location;
    } catch (err) {
      throw new LocationRequestError();
    }
  }
}
