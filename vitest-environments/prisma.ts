import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Environment } from "vitest";
import { randomUUID } from "crypto";
import { execSync } from "child_process";
import path from "path";
import { fs } from "mz";

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Provide a DATABASE_URL environment variable");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>(<unknown>{
  name: "prisma",
  transformMode: "web",
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$queryRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );

        await prisma.$disconnect();

        const uploadsPath = path.resolve(__dirname, "..", "uploads");

        fs.readdir(uploadsPath, (err, files) => {
          if (err) throw new Error("Directory not found");

          files.forEach((file) => {
            const filePath = path.join(uploadsPath, file);
            const uploadExampleFileName = "92ca15cfa66aeab1d1be-pet.jpg";

            const deleteFileIsAllowed = !filePath.includes(
              uploadExampleFileName
            );

            if (deleteFileIsAllowed) {
              fs.unlink(filePath, (err) => {
                if (err) {
                  console.error(err);
                  throw new Error("Deleting file error");
                }
              });
            }
          });
        });
      },
    };
  },
});
