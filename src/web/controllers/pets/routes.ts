import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJWT } from "@/web/middlewares/verify-jwt";
import upload from "@/core/config/multer";

export async function petsRoutes(app: FastifyInstance) {
  // Auth 🔒
  app.post(
    "/pets",
    { onRequest: [verifyJWT], preHandler: upload.array("images", 6) },
    create
  );
}
