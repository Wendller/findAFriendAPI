import { PetRequirement, Prisma } from "@prisma/client";
import { PetRequirementsRepository } from "../pet-requirements-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetRequirementsRepository
  implements PetRequirementsRepository
{
  public items: PetRequirement[] = [];

  async create(data: Prisma.PetRequirementUncheckedCreateInput) {
    const petRequirement = {
      id: data.id ?? randomUUID(),
      title: data.title,
      pet_id: data.pet_id,
    };

    this.items.push(petRequirement);

    return petRequirement;
  }

  async createMany(data: Prisma.PetRequirementUncheckedCreateInput[]) {
    for (const requirement of data) {
      this.items.push({
        id: requirement.id ?? randomUUID(),
        title: requirement.title,
        pet_id: requirement.pet_id,
      });
    }
  }
}
