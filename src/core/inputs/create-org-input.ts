import { z } from "zod";

export class CreateOrgInput {
  name: string;
  email: string;
  password: string;
  postalCode: string;
  address: string;
  whatsapp: string;

  constructor(data: any) {
    const createOrgSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      postalCode: z.string().refine((value) => {
        return value !== "" && /^[0-9]{8}$/.test(value);
      }),
      address: z.string(),
      whatsapp: z.string(),
    });

    const validation = createOrgSchema.parse(data);

    this.name = validation.name;
    this.email = validation.email;
    this.password = validation.password;
    this.postalCode = validation.postalCode;
    this.address = validation.address;
    this.whatsapp = validation.whatsapp;
  }
}
