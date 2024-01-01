import { z } from "zod";

export class CreatePetImageInput {
  imageUrl: string;

  constructor(data: unknown) {
    const createPetImageSchema = z.object({
      imageUrl: z.string(),
    });

    const validation = createPetImageSchema.parse(data);

    this.imageUrl = validation.imageUrl;
  }
}
