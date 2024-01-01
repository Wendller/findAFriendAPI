import { z } from "zod";

export class SearchPetsInput {
  city: string;
  age?: string;
  size?: string;
  energyLevel?: string;
  independencyLevel?: string;

  constructor(data: any) {
    const searchPetsSchema = z.object({
      city: z.string(),
      age: z.string().optional(),
      size: z.string().optional(),
      energyLevel: z.string().optional(),
      independencyLevel: z.string().optional(),
    });

    const validation = searchPetsSchema.parse(data);

    this.city = validation.city;
    this.age = validation.age;
    this.size = validation.size;
    this.energyLevel = validation.energyLevel;
    this.independencyLevel = validation.independencyLevel;
  }
}
