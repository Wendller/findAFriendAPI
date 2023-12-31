import { prisma } from "@/core/lib/prisma";
import { OrgsRepository } from "../orgs-repository";
import { Prisma } from "@prisma/client";

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email: email,
      },
    });

    return org;
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    });

    return org;
  }
}
