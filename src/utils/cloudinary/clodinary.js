import cloudinary from "../../config/cloudinary.config.js";
import fs from "fs";

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "myProjects",
      type: "private",
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new Error(`Cloudinary Upload Error: ${error.message}`);
  }
};

export { uploadToCloudinary };
