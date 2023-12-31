import { PetImage, Prisma } from "@prisma/client";
import { PetImagesRepository } from "../pet-images-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetImagesRepository implements PetImagesRepository {
  public items: PetImage[] = [];

  async create(data: Prisma.PetImageUncheckedCreateInput) {
    const petImage = {
      id: data.id ?? randomUUID(),
      image_url: data.image_url,
      pet_id: data.pet_id,
    };

    this.items.push(petImage);

    return petImage;
  }

  async createMany(data: Prisma.PetImageUncheckedCreateInput[]) {
    for (const image of data) {
      this.items.push({
        id: image.id ?? randomUUID(),
        image_url: image.image_url,
        pet_id: image.pet_id,
      });
    }
  }
}
