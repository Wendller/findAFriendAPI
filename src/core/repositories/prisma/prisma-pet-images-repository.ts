import { prisma } from "@/core/lib/prisma";
import { PetImagesRepository } from "../pet-images-repository";
import { Prisma } from "@prisma/client";

export class PrismaPetImagesRepository implements PetImagesRepository {
  async create(data: Prisma.PetImageUncheckedCreateInput) {
    const petImage = await prisma.petImage.create({
      data,
    });

    return petImage;
  }

  async createMany(data: Prisma.PetImageUncheckedCreateInput[]) {
    await prisma.petImage.createMany({
      data: data,
      skipDuplicates: true,
    });
  }
}
