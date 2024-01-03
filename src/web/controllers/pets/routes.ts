import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJWT } from "@/web/middlewares/verify-jwt";
import upload from "@/core/config/multer";
import { search } from "./search";
import { profile } from "./profile";

export async function petsRoutes(app: FastifyInstance) {
  app.get("/pets", search);
  app.get("/pets/:petId", profile);

  // Auth 🔒
  app.post(
    "/pets",
    { onRequest: [verifyJWT], preHandler: upload.array("images", 6) },
    create
  );
}
