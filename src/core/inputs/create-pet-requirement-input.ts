import { z } from "zod";

export class CreatePetRequirementInput {
  title: string;

  constructor(data: unknown) {
    const createPetRequirementSchema = z.object({
      title: z.string(),
    });

    const validation = createPetRequirementSchema.parse(data);

    this.title = validation.title;
  }
}
