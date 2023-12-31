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

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        org: true,
        images: true,
        requirements: true,
      },
    });

    return pet;
  }
}
