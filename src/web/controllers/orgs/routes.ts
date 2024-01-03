import { FastifyInstance } from "fastify";
import { signUp } from "./sign-up";
import { signIn } from "./sign-in";
import { refresh } from "./refresh";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", signUp);
  app.post("/orgs/sessions", signIn);
  app.patch("/orgs/token/refresh", refresh);
}
