import { makeAuthenticateCommand } from "@/core/commands/factories/make-authenticate-command";
import { InvalidCredentialsError } from "@/core/errors/invalid-credentials-error";
import { AuthenticateInput } from "@/core/inputs/authenticate-input";
import { FastifyReply, FastifyRequest } from "fastify";

export async function signIn(request: FastifyRequest, reply: FastifyReply) {
  const signInInput = new AuthenticateInput(request.body);

  try {
    const signInCommand = makeAuthenticateCommand();

    const { org } = await signInCommand.execute(signInInput);

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    );

    return reply.status(200).send({
      org: {
        name: org.name,
        email: org.email,
        postalCode: org.postal_code,
        address: org.address,
        city: org.city,
        ufCode: org.uf_code,
        whatsapp: org.whatsapp,
      },
      token,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
