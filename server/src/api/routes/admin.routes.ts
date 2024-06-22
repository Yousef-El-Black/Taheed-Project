import { Router, IRouter } from "express";
import {
  createNewAdmin,
  deleteAdmin,
  getAdmin,
  getAllAdmins,
  updateAdmin,
  createMainAdmin,
  authenticate,
} from "../../controllers/admin.controller";
import { validateAccessMiddleware } from "../../middlewares/auth.middleware";

const adminRoutes: IRouter = Router();

adminRoutes.post("/mainAdmin", createMainAdmin);

adminRoutes.post("/auth", authenticate);

adminRoutes.post("/", validateAccessMiddleware, createNewAdmin);

adminRoutes.put("/:id", updateAdmin);

adminRoutes.delete("/:id", validateAccessMiddleware, deleteAdmin);

adminRoutes.get("/:id", validateAccessMiddleware, getAdmin);

adminRoutes.get("/", validateAccessMiddleware, getAllAdmins);

export default adminRoutes;
