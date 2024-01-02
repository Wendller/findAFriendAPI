import { makeAuthenticateCommand } from "@/core/commands/factories/make-authenticate-command";
import { InvalidCredentialsError } from "@/core/errors/invalid-credentials-error";
import { AuthenticateInput } from "@/core/inputs/authenticate-input";
import { FastifyReply, FastifyRequest } from "fastify";

export async function signIn(request: FastifyRequest, reply: FastifyReply) {
  const signInInput = new AuthenticateInput(request.body);

  try {
    const signInCommand = makeAuthenticateCommand();

    await signInCommand.execute(signInInput);

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
