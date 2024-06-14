import dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  EMAIL_PASS,
  EMAIL_GMAIL,
  MONGODB_URI,
  PEPPER,
  SALT,
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
} = process.env;
