import { PrismaPetsRepository } from "@/core/repositories/prisma/prisma-pets-repository";
import { GetPetProfileCommand } from "../get-pet-profile";

export function makeGetPetProfileCommand() {
  const petsRepository = new PrismaPetsRepository();
  const command = new GetPetProfileCommand(petsRepository);

  return command;
}
