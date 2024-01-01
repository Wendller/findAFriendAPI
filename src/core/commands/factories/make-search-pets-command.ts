import { PrismaPetsRepository } from "@/core/repositories/prisma/prisma-pets-repository";
import { SearchPetsCommand } from "../search-pets";

export function makeSearchPetsCommand() {
  const petsRepository = new PrismaPetsRepository();
  const command = new SearchPetsCommand(petsRepository);

  return command;
}
