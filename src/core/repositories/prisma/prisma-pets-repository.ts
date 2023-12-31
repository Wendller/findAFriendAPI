import { prisma } from "@/core/lib/prisma";
import { PetsRepository } from "../pets-repository";
import { Prisma } from "@prisma/client";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
