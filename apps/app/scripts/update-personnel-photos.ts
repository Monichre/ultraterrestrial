
import { xata } from "@/services/xata/xata"

import fs from 'fs/promises';
import path from 'path';
export const updatePersonnelPhotos = async () => {
  const personnel = await xata.db.personnel.getAll()
  console.log( "🚀 ~ file: update-personnel-photos.ts:10 ~ updatePersonnelPhotos ~ personnel:", personnel )

const readImageFiles = async (directory: string): Promise<string[]> => {
  const files = await fs.readdir(directory);
  return files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
};

const matchImageToPersonnel = (personnel: any[], imageFiles: string[]): { [key: string]: string } => {
  const matchedImages: { [key: string]: string } = {};

  personnel.forEach((person, index) => {
    const imageName = imageFiles.find(file => file.includes(person.name));
    if (imageName) {
      matchedImages[person.name] = imageName;
    }
  });

  return matchedImages;
};

export const updatePersonnelPhotos = async () => {
  const personnel = await xata.db.personnel.getAll();
  console.log("🚀 ~ file: update-personnel-photos.ts:10 ~ updatePersonnelPhotos ~ personnel:", personnel);

  const imageDirectory = path.join(__dirname, './uploads/personnel');
  console.log("Image directory path:", imageDirectory);

  const imageFiles = await readImageFiles(imageDirectory);
  console.log("Image files found:", imageFiles);

  const matchedImages = matchImageToPersonnel(personnel, imageFiles);
  console.log("Matched images to personnel:", matchedImages);

  console.log("Matched Images:", matchedImages);
};

updatePersonnelPhotos();

}

