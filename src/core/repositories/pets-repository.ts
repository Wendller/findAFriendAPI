import { Prisma, Pet } from "@prisma/client";

export interface SearchManyParams {
  city: string;
  age?: string;
  energyLevel?: string;
  size?: string;
  independencyLevel?: string;
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  searchMany(data: SearchManyParams): Promise<Pet[]>;
}
