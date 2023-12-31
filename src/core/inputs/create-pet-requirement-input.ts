import { z } from "zod";

export class CreatePetRequirementInput {
  title: string;

  constructor(data: any) {
    const createPetRequirementSchema = z.object({
      title: z.string(),
    });

    const validation = createPetRequirementSchema.parse(data);

    this.title = validation.title;
  }
}
