import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const deleteImg = async (nameImage) => {
  try {
    promisify(fs.unlink)(path.resolve(__dirname, "../storage/imgs", nameImage));
  } catch (error) {
    console.log("error en la funcion deleteImg", error);
  }
};
