import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      postal_code: data.postal_code,
      address: data.address,
      city: data.city,
      uf_code: data.uf_code,
      whatsapp: data.whatsapp,
      created_at: new Date(),
    };

    this.items.push(org);

    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  async findById(id: string) {
    const org = this.items.find((org) => org.id === id);

    if (!org) {
      return null;
    }

    return org;
  }
}
