/*
  Warnings:

  - You are about to drop the `PetRequirement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `environment_type` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PetRequirement" DROP CONSTRAINT "PetRequirement_pet_id_fkey";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "environment_type" TEXT NOT NULL;

-- DropTable
DROP TABLE "PetRequirement";

-- CreateTable
CREATE TABLE "pet_requirements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "pet_requirements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pet_requirements" ADD CONSTRAINT "pet_requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
