import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SEC } from "../config";

export const validateTokenMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const bearer = authHeader.split(" ")[0].toLowerCase();
      const token = authHeader.split(" ")[1];
      if (bearer === "bearer" && token) {
        const decode = jwt.verify(token, JWT_SEC as string);
        if (decode) {
          next();
        }
      } else {
        next(new Error(`Not Found Token`));
      }
    } else {
      next(new Error(`Not Found Auth`));
    }
  } catch (err) {
    next(err);
  }
};

export const validateAccessMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.userId) {
      if (req.body.userId === req.params.id) {
        next();
      } else {
        console.log("You are not Authenticated!");
      }
    } else {
      validateTokenMiddleware(req, res, next);
    }
  } catch (err) {
    next(err);
  }
};
