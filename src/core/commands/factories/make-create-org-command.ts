import { PrismaOrgsRepository } from "@/core/repositories/prisma/prisma-orgs-repository";
import { CreateOrgCommand } from "../create-org";

export function makeCreateOrgCommand() {
  const orgsRepository = new PrismaOrgsRepository();
  const command = new CreateOrgCommand(orgsRepository);

  return command;
}
