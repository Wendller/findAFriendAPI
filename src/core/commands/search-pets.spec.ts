import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository";
import { petDatabaseFactory } from "../utils/tests/factories/pets-factory";
import { SearchPetsCommand } from "./search-pets";

let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsCommand;

describe("Search Pets command", () => {
  beforeAll(() => {
    petsRepository = new InMemoryPetsRepository();

    sut = new SearchPetsCommand(petsRepository);
  });

  beforeEach(() => {
    petsRepository.items = [];
  });

  it("should be able to search for pets by city", async () => {
    const city = "Los Santos";

    await petsRepository.create(
      petDatabaseFactory.build({ name: "Stuart", city: city })
    );

    await petsRepository.create(
      petDatabaseFactory.build({ name: "Snow", city: city })
    );

    await petsRepository.create(
      petDatabaseFactory.build({ name: "Fido", city: "Vice City" })
    );

    const { pets, total } = await sut.execute({ city: city });

    expect(total).toStrictEqual(2);
    expect(pets).toEqual([
      expect.objectContaining({ name: "Stuart" }),
      expect.objectContaining({ name: "Snow" }),
    ]);
  });

  it("should be able to search for pets with filters", async () => {
    const city = "Los Santos";
    const independencyLevel = "low";
    const size = "small";
    const age = "baby";
    const energyLevel = "high";

    const targetPet = await petsRepository.create(
      petDatabaseFactory.build({
        name: "Stuart",
        city: city,
        independency_level: independencyLevel,
        size: size,
        age: age,
        energy_level: energyLevel,
      })
    );

    await petsRepository.create(
      petDatabaseFactory.build({ name: "Snow", city: city })
    );

    await petsRepository.create(
      petDatabaseFactory.build({ name: "Fido", city: "Vice City" })
    );

    const { pets, total } = await sut.execute({
      city: city,
      independencyLevel: independencyLevel,
      size: size,
      age: age,
      energyLevel: energyLevel,
    });

    expect(total).toStrictEqual(1);
    expect(pets).toEqual([
      expect.objectContaining({ id: targetPet.id, name: targetPet.name }),
    ]);
  });
});
