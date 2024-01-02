import { prisma } from "@/core/config/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const org = await prisma.org.create({
    data: {
      name: "Find a friend",
      email: "findafriend@mail.com",
      password_hash: await hash("123456", 6),
      postal_code: "01001000",
      address: "Baker Street, 501",
      uf_code: "SP",
      city: "Sao Paulo",
      whatsapp: "86999999999",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "findafriend@mail.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token, orgId: org.id };
}
