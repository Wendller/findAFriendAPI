import { Pet } from "@prisma/client";
import { PetsRepository } from "@/core/repositories/pets-repository";
import { GetPetProfileInput } from "../inputs/get-pet-profile-input";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPetProfileResponse {
  pet: Pet;
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
