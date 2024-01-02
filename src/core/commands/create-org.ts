import { Org } from "@prisma/client";
import { OrgsRepository } from "@/core/repositories/orgs-repository";
import { hash } from "bcryptjs";
import { getLocationByCEP } from "../adapters/get-location-by-cep/brasil-api";
import { OrgAlreadyExistsError } from "../errors/org-already-exists-error";
import { CreateOrgInput } from "../inputs/create-org-input";
import { Decimal } from "@prisma/client/runtime/library";

interface CreateOrgResponse {
  org: Org;
}

export class CreateOrgCommand {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    postalCode,
    address,
    whatsapp,
  }: CreateOrgInput): Promise<CreateOrgResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);
    const orgLocation = await new getLocationByCEP().exec(postalCode);

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash: passwordHash,
      postal_code: postalCode,
      address: address,
      city: orgLocation.city,
      uf_code: orgLocation.stateCode,
      latitude: new Decimal(orgLocation.latitude),
      longitude: new Decimal(orgLocation.longitude),
      whatsapp,
    });

    return { org };
  }
}
