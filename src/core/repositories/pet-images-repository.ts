import { Prisma, PetImage } from "@prisma/client";

export interface PetImagesRepository {
  create(data: Prisma.PetImageUncheckedCreateInput): Promise<PetImage>;
  createMany(data: Prisma.PetImageUncheckedCreateInput[]): Promise<void>;
  getManyByPetId(petId: string): Promise<PetImage[] | null>;
}
