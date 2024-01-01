import { PrismaOrgsRepository } from "@/core/repositories/prisma/prisma-orgs-repository";
import { AuthenticateCommand } from "../authenticate";

export function makeAuthenticateCommand() {
  const orgsRepository = new PrismaOrgsRepository();
  const command = new AuthenticateCommand(orgsRepository);

  return command;
}
