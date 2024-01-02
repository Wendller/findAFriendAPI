/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Factory from "factory.ts";
import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";

interface DatabaseOrg {
  id: any;
  name: any;
  email: any;
  password: any;
  password_hash: any;
  postal_code: any;
  address: any;
  city: any;
  uf_code: any;
  whatsapp: any;
  created_at: any;
}

interface ObjectOrg {
  id: any;
  name: any;
  email: any;
  password: any;
  passwordHash: any;
  postalCode: any;
  address: any;
  city: any;
  ufCode: any;
  whatsapp: any;
  createdAt: any;
}

export const orgDatabaseFactory = Factory.Sync.makeFactory<DatabaseOrg>({
  id: randomUUID(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  password_hash: faker.internet.password(),
  postal_code: faker.location.zipCode("########"),
  address: faker.location.streetAddress(),
  whatsapp: faker.phone.number(),
  city: faker.location.city(),
  uf_code: faker.location.state({ abbreviated: true }),
  created_at: new Date(),
});

export const orgFactory = Factory.Sync.makeFactory<ObjectOrg>({
  id: randomUUID(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordHash: faker.internet.password(),
  postalCode: faker.location.zipCode("########"),
  address: faker.location.streetAddress(),
  whatsapp: faker.phone.number(),
  city: faker.location.city(),
  ufCode: faker.location.state({ abbreviated: true }),
  createdAt: new Date(),
});
