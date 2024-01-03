import { FastifyReply, FastifyRequest } from "fastify";
import { SearchPetsInput } from "@/core/inputs/search-pets-input";
import { makeSearchPetsCommand } from "@/core/commands/factories/make-search-pets-command";
import { env } from "@/core/env";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsInput = new SearchPetsInput(request.query);

  const searchPetsCommand = makeSearchPetsCommand();

  const { pets, total } = await searchPetsCommand.execute(searchPetsInput);

  const petsResponse = pets.map((pet) => ({
    ...pet,
    images: pet.images.map((image) => ({
      image_url: `${env.APP_URL}/images/${image.image_url}`,
    })),
  }));

  return reply.status(200).send({ pets: petsResponse, total });
}
