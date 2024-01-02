import multer from "fastify-multer";
import path from "path";
import { randomBytes } from "node:crypto";

const uploadFolderPath = path.resolve(__dirname, "..", "..", "..", "uploads");

const multerStorage = multer.diskStorage({
  destination: uploadFolderPath,
  filename: async function (req, file, cb) {
    const fileSalt = randomBytes(10).toString("hex");
    const fileName = `${fileSalt}-${file.originalname}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage: multerStorage, dest: uploadFolderPath });

export default upload;
