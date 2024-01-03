-- DropForeignKey
ALTER TABLE "pet_images" DROP CONSTRAINT "pet_images_pet_id_fkey";

-- DropForeignKey
ALTER TABLE "pet_requirements" DROP CONSTRAINT "pet_requirements_pet_id_fkey";

-- AddForeignKey
ALTER TABLE "pet_images" ADD CONSTRAINT "pet_images_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_requirements" ADD CONSTRAINT "pet_requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
