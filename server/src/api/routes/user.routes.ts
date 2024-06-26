import { Router, IRouter } from "express";
import {
  createUser,
  moveUserToSecondStage,
  moveUserToThirdStage,
  moveUserToFourthStage,
  verifyUser,
  editUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserByEmail,
} from "../../controllers/user.controller";
import {
  validateAccessMiddleware,
  validateTokenMiddleware,
} from "../../middlewares/auth.middleware";

const userRoutes: IRouter = Router();

userRoutes.post("/stageone", createUser);

userRoutes.post("/stagetwo/:id", moveUserToSecondStage);

userRoutes.post("/stagethree/:id", moveUserToThirdStage);

userRoutes.post("/stagefour/:id", moveUserToFourthStage);

userRoutes.post("/verify/:id", verifyUser);

userRoutes.put("/:id", validateTokenMiddleware, editUser);

userRoutes.delete("/:id", deleteUser);

userRoutes.get("/findbyemail/:email", getUserByEmail);

userRoutes.get("/:id", validateAccessMiddleware, getUser);

userRoutes.get("/", validateTokenMiddleware, getAllUsers);

export default userRoutes;
