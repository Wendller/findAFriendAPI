import { prisma } from "@/core/lib/prisma";
import { PetRequirementsRepository } from "../pet-requirements-repository";
import { Prisma } from "@prisma/client";

export class PrismaPetRequirementsRepository
  implements PetRequirementsRepository
{
  async create(data: Prisma.PetRequirementUncheckedCreateInput) {
    const petRequirement = await prisma.petRequirement.create({
      data,
    });

    return petRequirement;
  }

  async createMany(data: Prisma.PetRequirementUncheckedCreateInput[]) {
    await prisma.petRequirement.createMany({
      data: data,
      skipDuplicates: true,
    });
  }

  async getManyByPetId(petId: string) {
    const petRequirements = await prisma.petRequirement.findMany({
      where: {
        pet_id: petId,
      },
    });

    return petRequirements;
  }
}
