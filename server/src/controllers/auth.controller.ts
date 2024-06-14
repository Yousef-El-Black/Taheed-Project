import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import { PEPPER } from "../config";

// Sign In
export const signIn = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      const isPasswordValid = () => {
        const pepper = PEPPER as string;
        return bcrypt.compareSync(
          `${req.body.password}${pepper}`,
          user.password as any
        );
      };

      if (isPasswordValid()) {
        res.status(200).json(user);
      } else {
        res.status(403).json("Password is Wrong!");
      }
    } else {
      res.status(404).json("User is not Found!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
