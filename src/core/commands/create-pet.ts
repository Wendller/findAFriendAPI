import { Pet } from "@prisma/client";
import { OrgsRepository } from "@/core/repositories/orgs-repository";
import { PetsRepository } from "@/core/repositories/pets-repository";
import { PetImagesRepository } from "@/core/repositories/pet-images-repository";
import { PetRequirementsRepository } from "@/core/repositories/pet-requirements-repository";
import { CreatePetInput } from "../inputs/create-pet-input";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { SavePetError } from "../errors/save-pet-error";

interface CreatePetResponse {
  pet: Pet;
}

export class CreatePetCommand {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
    private petImagesRepository: PetImagesRepository,
    private petRequirementsRepository: PetRequirementsRepository
  ) {}

  async execute({
    name,
    description,
    age,
    size,
    energyLevel,
    independencyLevel,
    environmentType,
    images,
    requirements,
    orgId,
  }: CreatePetInput): Promise<CreatePetResponse> {
    const orgAssociated = await this.orgsRepository.findById(orgId);

    if (!orgAssociated) {
      throw new ResourceNotFoundError();
    }

    try {
      const imagesToCreate = [];
      const requirementsToCreate = [];

      const pet = await this.petsRepository.create({
        name: name,
        description: description,
        age: age,
        size: size,
        energy_level: energyLevel,
        independency_level: independencyLevel,
        environment_type: environmentType,
        org_id: orgId,
        city: orgAssociated.city,
      });

      for (const image of images) {
        imagesToCreate.push({ image_url: image.imageUrl, pet_id: pet.id });
      }

      await this.petImagesRepository.createMany(imagesToCreate);

      if (requirements && requirements.length > 0) {
        for (const requirement of requirements) {
          requirementsToCreate.push({
            title: requirement.title,
            pet_id: pet.id,
          });
        }

        await this.petRequirementsRepository.createMany(requirementsToCreate);
      }

      return { pet };
    } catch (err) {
      throw new SavePetError();
    }
  }
}
