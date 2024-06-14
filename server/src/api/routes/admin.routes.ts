import { Router, IRouter } from "express";
import {
  createNewAdmin,
  deleteAdmin,
  getAdmin,
  getAllAdmins,
  updateAdmin,
} from "../../controllers/admin.controller";

const adminRoutes: IRouter = Router();

adminRoutes.post("/", createNewAdmin);

adminRoutes.put("/:id", updateAdmin);

adminRoutes.delete("/:id", deleteAdmin);

adminRoutes.get("/:id", getAdmin);

adminRoutes.get("/", getAllAdmins);

export default adminRoutes;
