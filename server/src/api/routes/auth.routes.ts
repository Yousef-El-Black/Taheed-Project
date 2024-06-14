import { Router, IRouter } from "express";
import { signIn } from "../../controllers/auth.controller";

const authRoutes: IRouter = Router();

authRoutes.post("/signin", signIn);

export default authRoutes;
