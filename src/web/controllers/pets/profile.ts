import { makeGetPetProfileCommand } from "@/core/commands/factories/make-get-pet-profile-command.";
import { env } from "@/core/env";
import { GetPetProfileInput } from "@/core/inputs/get-pet-profile-input";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getPetProfileInput = new GetPetProfileInput(request.params);

  const getPetProfileCommand = makeGetPetProfileCommand();

  const { pet } = await getPetProfileCommand.execute(getPetProfileInput);
  const org = pet.org;

  const petResponse = {
    ...pet,
    images: pet.images.map((image) => ({
      image_url: `${env.APP_URL}/images/${image.image_url}`,
    })),
    org: {
      ...org,
      password_hash: undefined,
    },
  };

  return reply.status(200).send({ pet: petResponse });
}
