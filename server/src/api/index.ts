import { IRouter, Router } from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import contractRoutes from "./routes/contract.routes";
import adminRoutes from "./routes/admin.routes";
import uploadRoutes from "./routes/upload.routes";
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // Temporary storage before uploading to Cloudinary

// Define Main Router
const mainRoutes: IRouter = Router();

mainRoutes.use("/user", userRoutes);

mainRoutes.use("/auth", authRoutes);

mainRoutes.use("/admin", adminRoutes);

mainRoutes.use("/contract", contractRoutes);

mainRoutes.use("/upload", upload.single("image"), uploadRoutes);

export default mainRoutes;
