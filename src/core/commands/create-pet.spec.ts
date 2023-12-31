import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";
import { orgDatabaseFactory } from "../tests/factories/orgs-factory";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { InMemoryPetImagesRepository } from "../repositories/in-memory/in-memory-pet-images-repository";
import { InMemoryPetRequirementsRepository } from "../repositories/in-memory/in-memory-pet-requirements-repository";
import { CreatePetCommand } from "./create-pet";
import {
  petFactory,
  petImageFactory,
  petRequirementFactory,
} from "../tests/factories/pets-factory";
import { CreatePetInput } from "../inputs/create-pet-input";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let petImagesRepository: InMemoryPetImagesRepository;
let petRequirementsRepository: InMemoryPetRequirementsRepository;
let sut: CreatePetCommand;

describe("Create Pet command", () => {
  beforeAll(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    petImagesRepository = new InMemoryPetImagesRepository();
    petRequirementsRepository = new InMemoryPetRequirementsRepository();

    sut = new CreatePetCommand(
      orgsRepository,
      petsRepository,
      petImagesRepository,
      petRequirementsRepository
    );
  });

  beforeEach(() => {
    petImagesRepository.items = [];
    petRequirementsRepository.items = [];
  });

  it("should be able to create a pet", async () => {
    const org = await orgsRepository.create(orgDatabaseFactory.build());

    const petParams = petFactory.build({
      orgId: org.id,
      images: petImageFactory.buildList(2),
      requirements: petRequirementFactory.buildList(2),
    });

    const input = new CreatePetInput(petParams);

    const { pet } = await sut.execute(input);

    const createdPetImages = petImagesRepository.items;
    const createdPetRequirements = petRequirementsRepository.items;

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: input.name,
        description: input.description,
        age: input.age,
        size: input.size,
        energy_level: input.energyLevel,
        independency_level: input.independencyLevel,
        environment_type: input.environmentType,
        created_at: expect.any(Date),
        org_id: input.orgId,
      })
    );

    expect(createdPetImages).toEqual([
      expect.objectContaining({
        pet_id: pet.id,
        image_url: expect.any(String),
      }),
      expect.objectContaining({
        pet_id: pet.id,
        image_url: expect.any(String),
      }),
    ]);

    expect(createdPetRequirements).toEqual([
      expect.objectContaining({
        pet_id: pet.id,
        title: expect.any(String),
      }),
      expect.objectContaining({
        pet_id: pet.id,
        title: expect.any(String),
      }),
    ]);
  });

  it("should be able to create a pet with no requirements", async () => {
    const org = await orgsRepository.create(orgDatabaseFactory.build());

    const petParams = petFactory.build({
      orgId: org.id,
      images: petImageFactory.buildList(2),
      requirements: null,
    });

    const input = new CreatePetInput(petParams);

    const { pet } = await sut.execute(input);

    const createdPetImages = petImagesRepository.items;
    const createdPetRequirements = petRequirementsRepository.items;

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: input.name,
        description: input.description,
        age: input.age,
        size: input.size,
        energy_level: input.energyLevel,
        independency_level: input.independencyLevel,
        environment_type: input.environmentType,
        created_at: expect.any(Date),
        org_id: input.orgId,
      })
    );

    expect(createdPetImages).toEqual([
      expect.objectContaining({
        pet_id: pet.id,
        image_url: expect.any(String),
      }),
      expect.objectContaining({
        pet_id: pet.id,
        image_url: expect.any(String),
      }),
    ]);

    expect(createdPetRequirements).toStrictEqual([]);
  });

  it("should not be able to create a pet when inexistent org", async () => {
    const petParams = petFactory.build({
      orgId: randomUUID(),
      images: petImageFactory.buildList(2),
      requirements: petRequirementFactory.buildList(2),
    });

    const input = new CreatePetInput(petParams);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
