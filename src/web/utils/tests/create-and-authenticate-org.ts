import { prisma } from "@/core/config/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrg(
  app: FastifyInstance,
  email: string = "findafriend@mail.com"
) {
  const org = await prisma.org.create({
    data: {
      name: "Find a friend",
      email: email,
      password_hash: await hash("123456", 6),
      postal_code: "89010025",
      address: "Baker Street, 501",
      uf_code: "SP",
      city: "Sao Paulo",
      whatsapp: "86999999999",
      longitude: "-49.0629788",
      latitude: "-26.9244749",
    },
  });

  const authResponse = await request(app.server).post("/orgs/sessions").send({
    email: email,
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token, org: org };
}
