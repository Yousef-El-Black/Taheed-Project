import { Router, IRouter } from "express";
import {
  createContract,
  deleteContract,
  getAllContracts,
  getContract,
  getUserContracts,
  updateContract,
} from "../../controllers/contract.controller";

const contractRoutes: IRouter = Router();

contractRoutes.post("/", createContract);

contractRoutes.get("/user/:id", getUserContracts);

contractRoutes.get("/:id", getContract);

contractRoutes.get("/", getAllContracts);

contractRoutes.put("/:id", updateContract);

contractRoutes.post("/:id", deleteContract);

export default contractRoutes;
