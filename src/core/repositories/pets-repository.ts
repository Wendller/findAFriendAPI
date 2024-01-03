import { Prisma, Pet, PetImage, Org } from "@prisma/client";

interface ISearchManyPet extends Pet {
  images: PetImage[];
}

interface IPet extends Pet {
  images: PetImage[];
  org: Org;
}

export interface SearchManyParams {
  city: string;
  age?: string;
  energyLevel?: string;
  size?: string;
  independencyLevel?: string;
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<IPet | null>;
  searchMany(data: SearchManyParams): Promise<ISearchManyPet[]>;
}
