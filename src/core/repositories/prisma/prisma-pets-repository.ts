import { prisma } from "@/core/config/prisma";
import { PetsRepository, SearchManyParams } from "../pets-repository";
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

  async searchMany(data: SearchManyParams) {
    const pets = await prisma.pet.findMany({
      where: {
        city: data.city,
        age: data.age,
        size: data.size,
        energy_level: data.energyLevel,
        independency_level: data.independencyLevel,
      },
      include: {
        images: true,
      },
    });

    return pets;
  }
}
