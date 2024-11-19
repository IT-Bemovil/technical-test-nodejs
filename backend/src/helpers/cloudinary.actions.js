import cloudinary from "../config/cloudinary.config.js";
import { deleteImg } from "./deleteImg.js";

export const subirImagenACloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "posts",
    });

    // console.log(result);

    const { secure_url, public_id } = result;
    await deleteImg(file.filename);
    return { secure_url, public_id };
  } catch (error) {
    console.log("error en subirImagenACloudinary", error.message);
  }
};

export const eliminarImagenDeCloudinary = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.log("error en eliminarImagenDeCloudinary", error.message);
  }
};
