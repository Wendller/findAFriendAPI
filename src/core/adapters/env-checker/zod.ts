import { IEnvPort } from "@/core/ports/env-checker";

import { z } from "zod";

export class EnvZodAdapter implements IEnvPort {
  NODE_ENV: string;
  DATABASE_URL: string;
  PORT: number;

  constructor(env: NodeJS.ProcessEnv) {
    const envSchema = z.object({
      NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
      PORT: z.coerce.number().default(3333),
      DATABASE_URL: z.string().optional(),
    });

    const _env = envSchema.safeParse(env);

    if (_env.success === false) {
      console.error("🚨 Invalid environment variables!", _env.error.format());

      throw new Error("Invalid environment variables!");
    }

    this.NODE_ENV = String(_env.data.NODE_ENV);
    this.DATABASE_URL = String(_env.data.DATABASE_URL);
    this.PORT = Number(_env.data.PORT);
  }
}
