import { beforeAll, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { petDatabaseFactory } from "../tests/factories/pets-factory";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { GetPetProfileCommand } from "./get-pet-profile";

let petsRepository: InMemoryPetsRepository;
let sut: GetPetProfileCommand;

describe("Get Pet Profile command", () => {
  beforeAll(() => {
    petsRepository = new InMemoryPetsRepository();

    sut = new GetPetProfileCommand(petsRepository);
  });

  it("should be able to get a pet profile", async () => {
    const createdPet = await petsRepository.create(petDatabaseFactory.build());

    const { pet } = await sut.execute({ petId: createdPet.id });

    expect(pet.id).toStrictEqual(createdPet.id);
  });

  it("should not be able to get a pet profile when pet doens't exists", async () => {
    await expect(() =>
      sut.execute({ petId: randomUUID() })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
