import { Org, Pet, PetImage } from "@prisma/client";
import { PetsRepository } from "@/core/repositories/pets-repository";
import { GetPetProfileInput } from "../inputs/get-pet-profile-input";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface IPet extends Pet {
  images: PetImage[];
  org: Org;
}

interface GetPetProfileResponse {
  pet: IPet;
}

export class GetPetProfileCommand {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ petId }: GetPetProfileInput): Promise<GetPetProfileResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }
}
