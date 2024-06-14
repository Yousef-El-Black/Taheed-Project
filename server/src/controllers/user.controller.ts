import UserModel from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import { createVerificationCode } from "../utils/verificationCode";
import { sendMail } from "../libs/nodemailer";
import bcrypt from "bcrypt";
import { PEPPER, SALT } from "../config";
import AdminModel from "../models/admin.model";

// Register a new Email for The First Time
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = new UserModel({ email: req.body.email });
    const verificationCode = createVerificationCode();
    sendMail(
      req.body.email,
      "Taheed Verification Code",
      `This is Your Verification Code: ${verificationCode}`
    );
    const savedUser = await newUser.save();
    res.status(201).json({ ...savedUser, verificationCode });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Move User to Second Stage after Getting the Verification Code
export const moveUserToSecondStage = async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id as string,
      {
        verifiyStage: "second",
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Move User to Third Stage after Getting His Total Info
export const moveUserToThirdStage = async (req: Request, res: Response) => {
  try {
    const realPassword = req.body.password;
    const pepper = PEPPER as string;
    const salt = bcrypt.genSaltSync(parseInt(SALT as string) as number);
    const password = bcrypt.hashSync(`${realPassword}${pepper}`, salt);
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id as string,
      {
        verifiyStage: "third",
        phone: req.body.phone,
        fullName: req.body.fullName,
        nationalId: req.body.nationalId,
        password,
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Move User to Fourth Stage after Making A Contract
export const moveUserToFourthStage = async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
      verifiyStage: "fourth",
      contracts: req.body.contracts,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Verify User
export const verifyUser = async (req: Request, res: Response) => {
  try {
    const admin = await AdminModel.findById(req.body.adminId);
    if (admin) {
      const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
        verifiyStage: "completed",
      });
      res.status(200).json(updatedUser);
    } else {
      res.status(401).json("You Are not Have Access To Do That!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Edit User
export const editUser = async (req: Request, res: Response) => {
  try {
    const admin = await AdminModel.findById(req.body.adminId);
    if (admin?.fullAccess || req.body.userId == req.params.id) {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(401).json("You Are not Have Access To Do That!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const admin = await AdminModel.findById(req.body.adminId);
    if (admin?.fullAccess || req.body.userId == req.params.id) {
      const updatedUser = await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been Deleted!");
    } else {
      res.status(401).json("You Are not Have Access To Do That!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get User
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get All Users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    if (req.query.search) {
      const regex = new RegExp(req.query.search as string, "i");

      const selectedUsers = await UserModel.find({
        fullName: { $regex: regex },
      });
      res.status(200).json(selectedUsers);
    } else {
      const users = await UserModel.find();
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get All Users
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findOne({ email: req.params.email });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};
