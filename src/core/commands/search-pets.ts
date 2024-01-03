import { Pet, PetImage } from "@prisma/client";
import { PetsRepository } from "@/core/repositories/pets-repository";
import { SearchPetsInput } from "../inputs/search-pets-input";

interface IPet extends Pet {
  images: PetImage[];
}

interface SearchPetsResponse {
  pets: IPet[];
  total: number;
}

interface SearchPetsResponse {
  pets: IPet[];
  total: number;
}

export class SearchPetsCommand {
  constructor(private petsRepository: PetsRepository) {}

  async execute(data: SearchPetsInput): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.searchMany(data);

    return { pets, total: pets.length };
  }
}
