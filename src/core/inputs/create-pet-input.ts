import { z } from "zod";
import { CreatePetImageInput } from "./create-pet-image-input";
import { CreatePetRequirementInput } from "./create-pet-requirement-input";

export class CreatePetInput {
  name: string;
  description: string;
  age: string;
  size: string;
  energyLevel: string;
  independencyLevel: string;
  environmentType: string;
  orgId: string;
  images: CreatePetImageInput[];
  requirements?: CreatePetRequirementInput[] | null;

  constructor(data: any) {
    const imageInfoSchema = z.object({
      imageUrl: z.string(),
    });

    const requirementInfoSchema = z.object({
      title: z.string(),
    });

    const createPetSchema = z.object({
      name: z.string(),
      description: z.string(),
      age: z.string(),
      size: z.string(),
      energyLevel: z.string(),
      independencyLevel: z.string(),
      environmentType: z.string(),
      orgId: z.string().uuid(),
      images: z.array(imageInfoSchema),
      requirements: z.array(requirementInfoSchema).nullable(),
    });

    const validation = createPetSchema.parse(data);

    this.name = validation.name;
    this.description = validation.description;
    this.age = validation.age;
    this.size = validation.size;
    this.energyLevel = validation.energyLevel;
    this.independencyLevel = validation.independencyLevel;
    this.environmentType = validation.environmentType;
    this.orgId = validation.orgId;
    this.images = validation.images;
    this.requirements = validation.requirements;
  }
}
