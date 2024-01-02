import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/core/repositories/in-memory/in-memory-orgs-repository";
import { AuthenticateCommand } from "./authenticate";
import { hash } from "bcryptjs";
import { orgDatabaseFactory } from "../utils/tests/factories/orgs-factory";
import { faker } from "@faker-js/faker";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateCommand;

describe("Authenticate Command", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateCommand(orgsRepository);
  });

  it("should be able to authenticate", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const passwordHash = await hash(password, 6);

    await orgsRepository.create(
      orgDatabaseFactory.build({ email: email, password_hash: passwordHash })
    );

    const { org } = await sut.execute({ email, password });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const passwordHash = await hash(password, 6);

    await orgsRepository.create(
      orgDatabaseFactory.build({ email: email, password_hash: passwordHash })
    );

    await expect(() =>
      sut.execute({
        email: email,
        password: faker.internet.password(),
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
