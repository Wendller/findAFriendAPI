import { PrismaOrgsRepository } from "@/core/repositories/prisma/prisma-orgs-repository";
import { CreatePetCommand } from "../create-pet";
import { PrismaPetsRepository } from "@/core/repositories/prisma/prisma-pets-repository";
import { PrismaPetImagesRepository } from "@/core/repositories/prisma/prisma-pet-images-repository";
import { PrismaPetRequirementsRepository } from "@/core/repositories/prisma/prisma-pet-requirements-repository";

export function makeCreatePetCommand() {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();
  const petImagesRepository = new PrismaPetImagesRepository();
  const petRequirementsRepository = new PrismaPetRequirementsRepository();

  const command = new CreatePetCommand(
    orgsRepository,
    petsRepository,
    petImagesRepository,
    petRequirementsRepository
  );

  return command;
}
