import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";
import { InMemoryPetImagesRepository } from "./in-memory-pet-images-repository";
import { InMemoryPetRequirementsRepository } from "./in-memory-pet-requirements-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independency_level: data.independency_level,
      environment_type: data.environment_type,
      org_id: data.org_id,
      images: data.images,
      requirements: data.requirements,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }

    const images = new InMemoryPetImagesRepository().getManyByPetId(pet.id);
    const requirements = new InMemoryPetRequirementsRepository().getManyByPetId(
      pet.id
    );

    return {
      ...pet,
      images,
      requirements,
    };
  }
}
