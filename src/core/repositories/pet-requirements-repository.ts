import { Prisma, PetRequirement } from "@prisma/client";

export interface PetRequirementsRepository {
  create(
    data: Prisma.PetRequirementUncheckedCreateInput
  ): Promise<PetRequirement>;
  createMany(data: Prisma.PetRequirementUncheckedCreateInput[]): Promise<void>;
}
