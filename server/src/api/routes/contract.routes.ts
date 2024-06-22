import { Router, IRouter } from "express";
import {
  afterMonth,
  createContract,
  deleteContract,
  getAllContracts,
  getContract,
  getUserContracts,
  updateContract,
  getAcceptedContracts,
} from "../../controllers/contract.controller";
import { validateTokenMiddleware } from "../../middlewares/auth.middleware";

const contractRoutes: IRouter = Router();

contractRoutes.post("/", createContract);

contractRoutes.get("/accepted/", getAcceptedContracts);

contractRoutes.get("/user/:id", getUserContracts);

contractRoutes.get("/:id", getContract);

contractRoutes.get("/", validateTokenMiddleware, getAllContracts);

contractRoutes.put("/aftermonth/:id", afterMonth);

contractRoutes.put("/:id", updateContract);

contractRoutes.post("/:id", deleteContract);

export default contractRoutes;
