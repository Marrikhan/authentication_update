import { diskStorage } from "multer";
import { extname } from "path";

export const storage = diskStorage({
    destination: "./files",
    filename: (req, file, callback) => {
      callback(null, generateFilename(file));
    }
  });
  
  function generateFilename(file) {
    return `${Date.now()}.${extname(file.originalname)}`;
  }