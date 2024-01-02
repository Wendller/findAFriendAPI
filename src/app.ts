import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./core/env";
import { orgsRoutes } from "./web/controllers/orgs/routes";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(orgsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", details: error.format() });
  }

  if (env.NODE_ENV !== "prod") {
    console.error(error);
  }

  return reply
    .status(500)
    .send({ message: "Internal server error", details: error.message });
});
