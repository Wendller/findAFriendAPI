import { makeCreateOrgCommand } from "@/core/commands/factories/make-create-org-command";
import { OrgAlreadyExistsError } from "@/core/errors/org-already-exists-error";
import { CreateOrgInput } from "@/core/inputs/create-org-input";
import { FastifyReply, FastifyRequest } from "fastify";

export async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const signUpInput = new CreateOrgInput(request.body);

  try {
    const createOrgCommand = makeCreateOrgCommand();

    await createOrgCommand.execute(signUpInput);
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
