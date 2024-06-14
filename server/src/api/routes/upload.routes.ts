import { Router, IRouter } from "express";
import { uploadImage } from "../../controllers/upload.controller";

const uploadRoutes: IRouter = Router();

uploadRoutes.post("/", uploadImage);

export default uploadRoutes;
