import { z } from "zod";

export class GetPetProfileInput {
  petId: string;

  constructor(data: unknown) {
    const getPetProfileSchema = z.object({
      petId: z.string().uuid(),
    });

    const validation = getPetProfileSchema.parse(data);

    this.petId = validation.petId;
  }
}
