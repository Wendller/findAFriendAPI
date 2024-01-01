import { z } from "zod";

export class AuthenticateInput {
  email: string;
  password: string;

  constructor(data: unknown) {
    const AuthenticateSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const validation = AuthenticateSchema.parse(data);

    this.email = validation.email;
    this.password = validation.password;
  }
}
