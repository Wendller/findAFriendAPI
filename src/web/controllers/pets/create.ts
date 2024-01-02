import { makeCreatePetCommand } from "@/core/commands/factories/make-create-pet-command";
import { CreatePetImageInput } from "@/core/inputs/create-pet-image-input";
import { CreatePetInput } from "@/core/inputs/create-pet-input";
import { CreatePetRequirementInput } from "@/core/inputs/create-pet-requirement-input";
import { FastifyReply, FastifyRequest } from "fastify";
import { File } from "fastify-multer/lib/interfaces";

declare module "fastify" {
  export interface FastifyRequest {
    files: File[];
  }
}
interface IRequirement {
  title: string;
}

interface IBody {
  name: string;
  description: string;
  age: string;
  size: string;
  energyLevel: string;
  independencyLevel: string;
  environmentType: string;
  orgId: string;
  requirements?: IRequirement[];
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const rawImages: File[] = request.files;
  const images = [];
  const requirements = [];
  const body = request.body as IBody;

  for await (const image of rawImages) {
    const imageInput = new CreatePetImageInput({ imageUrl: image.filename });
    images.push(imageInput);
  }

  if (body.requirements) {
    for (const requirement of body.requirements) {
      const requirementInput = new CreatePetRequirementInput(requirement);
      requirements.push(requirementInput);
    }
  }

  const createPetInput = new CreatePetInput({ ...body, images, requirements });
  const createPetCommand = makeCreatePetCommand();

  await createPetCommand.execute(createPetInput);

  return reply.status(201).send();
}
