import * as Factory from "factory.ts";
import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";

interface PetImageDatabase {
  id: any;
  image_url: any;
  pet_id: any;
}

interface PetImageObject {
  imageUrl: any;
}

interface PetRequirementDatabase {
  id: any;
  title: any;
  pet_id: any;
}

interface PetRequirementObject {
  title: any;
}

interface PetDatabase {
  id: any;
  name: any;
  description: any;
  age: any;
  size: any;
  energy_level: any;
  independency_level: any;
  environment_type: any;
  orgId: any;
  images: any;
  requirements?: any;
}

interface PetObject {
  id: any;
  name: any;
  description: any;
  age: any;
  size: any;
  energyLevel: any;
  independencyLevel: any;
  environmentType: any;
  orgId: any;
  images: any;
  requirements?: any;
}

export const petImageDatabaseFactory =
  Factory.Sync.makeFactory<PetImageDatabase>({
    id: randomUUID(),
    image_url: faker.internet.url(),
    pet_id: randomUUID(),
  });

export const petImageFactory = Factory.Sync.makeFactory<PetImageObject>({
  imageUrl: faker.internet.url(),
});

export const petRequirementDatabaseFactory =
  Factory.Sync.makeFactory<PetRequirementDatabase>({
    id: randomUUID(),
    title: faker.internet.url(),
    pet_id: randomUUID(),
  });

export const petRequirementFactory =
  Factory.Sync.makeFactory<PetRequirementObject>({
    title: faker.internet.url(),
  });

export const petDatabaseFactory = Factory.Sync.makeFactory<PetDatabase>({
  id: randomUUID(),
  name: faker.person.firstName(),
  age: "baby",
  size: "medium",
  description: faker.company.catchPhrase(),
  energy_level: "medium",
  environment_type: "small",
  images: petImageFactory.buildList(2),
  independency_level: "low",
  orgId: randomUUID(),
  requirements: petRequirementFactory.buildList(2),
});

export const petFactory = Factory.Sync.makeFactory<PetObject>({
  id: randomUUID(),
  name: faker.person.firstName(),
  age: "baby",
  size: "medium",
  description: faker.company.catchPhrase(),
  energyLevel: "medium",
  environmentType: "small",
  images: petImageFactory.buildList(2),
  independencyLevel: "low",
  orgId: randomUUID(),
  requirements: petRequirementFactory.buildList(2),
});
