import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository";
import { CreateOrgCommand } from "./create-org";
import { orgFactory } from "../utils/tests/factories/orgs-factory";
import { CreateOrgInput } from "../inputs/create-org-input";
import { compare } from "bcryptjs";
import { faker } from "@faker-js/faker";
import { OrgAlreadyExistsError } from "../errors/org-already-exists-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgCommand;

const POSTAL_CODE = "89010025";
const BRASIL_API_URL = `https://brasilapi.com.br/api/cep/v2/${POSTAL_CODE}`;

const httpLocationResponse = {
  cep: "89010025",
  state: "SC",
  city: "Blumenau",
  neighborhood: "Centro",
  street: "Rua Doutor Luiz de Freitas Melro",
  service: "viacep",
  location: {
    type: "Point",
    coordinates: {
      longitude: "-49.0629788",
      latitude: "-26.9244749",
    },
  },
};

const restHandlers = [
  http.get(BRASIL_API_URL, () => {
    return HttpResponse.json(httpLocationResponse);
  }),
];

const server = setupServer(...restHandlers);

describe("Create Org command", () => {
  beforeAll(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgCommand(orgsRepository);

    server.listen({ onUnhandledRequest: "error" });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should be able to create an org hashing the password", async () => {
    const password = "123456";

    const orgParams = orgFactory.build({
      password: password,
      postalCode: POSTAL_CODE,
    });

    const input = new CreateOrgInput(orgParams);

    const { org } = await sut.execute(input);

    const isPasswordCorrectlyHashed = await compare(
      password,
      org.password_hash
    );

    expect(org).toEqual(
      expect.objectContaining({ id: expect.any(String), name: input.name })
    );
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to create an org with same email", async () => {
    const email = faker.internet.email();

    const input = new CreateOrgInput(
      orgFactory.build({
        email: email,
        postalCode: POSTAL_CODE,
      })
    );

    await sut.execute(input);

    const inputWithSameEmail = new CreateOrgInput(
      orgFactory.build({
        email: email,
        postalCode: POSTAL_CODE,
      })
    );

    await expect(() => sut.execute(inputWithSameEmail)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError
    );
  });
});
