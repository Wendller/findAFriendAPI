import { FastifyInstance } from "fastify";
import { signUp } from "./sign-up";
import { signIn } from "./sign-in";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", signUp);
  app.post("/sessions", signIn);
}
