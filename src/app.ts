import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./core/env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyStatic from "@fastify/static";
import { orgsRoutes } from "./web/controllers/orgs/routes";
import { petsRoutes } from "./web/controllers/pets/routes";
import path from "path";
import multer from "fastify-multer";

export const app = fastify();

app.register(multer.contentParser);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "10m",
  },
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
});

app.register(fastifyCookie);

app.register(fastifyStatic, {
  root: path.join(__dirname, "..", "uploads"),
  prefix: "/images/",
});

app.register(orgsRoutes);
app.register(petsRoutes);

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
