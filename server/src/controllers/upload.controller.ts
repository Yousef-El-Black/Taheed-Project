import { Response } from "express";
import cloudinary from "../libs/cloudinaryConfig";
import fs from "fs";

export const uploadImage = async (req: any, res: Response) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);
    console.log(result);
    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: "Image upload failed", err });
  }
};
