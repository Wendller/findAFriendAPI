import { compare } from "bcryptjs";
import { Org } from "@prisma/client";
import { OrgsRepository } from "../repositories/orgs-repository";
import { AuthenticateInput } from "../inputs/authenticate-input";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

interface AuthenticateCommandResponse {
  org: Org;
}

export class AuthenticateCommand {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateInput): Promise<AuthenticateCommandResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, org.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}
