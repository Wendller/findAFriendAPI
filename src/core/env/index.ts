import { config } from "dotenv";
import { EnvZodAdapter } from "@/core/adapters/env-checker/zod";

config();

export const env = new EnvZodAdapter(process.env);
