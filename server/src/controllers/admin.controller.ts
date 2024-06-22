import AdminModel from "../models/admin.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { JWT_SEC, PEPPER, SALT } from "../config";
import jwt from "jsonwebtoken";

// Create new Admin
export const createNewAdmin = async (req: Request, res: Response) => {
  try {
    const { password, ...data } = req.body;
    const pepper = PEPPER as string;
    const salt = bcrypt.genSaltSync(parseInt(SALT as string));
    const incodedPassword = bcrypt.hashSync(`${password}${pepper}`, salt);
    const newAdmin = new AdminModel({ ...data, password: incodedPassword });
    const creator = await AdminModel.findById(req.body.creatorID);
    if (creator?.fullAccess) {
      await newAdmin.save();
      res.status(201).json(newAdmin);
    } else {
      res.status(403).json("You don't have Access to Do That!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create the Main Admin
export const createMainAdmin = async (req: Request, res: Response) => {
  try {
    const { password, ...data } = req.body;
    const pepper = PEPPER as string;
    const salt = bcrypt.genSaltSync(parseInt(SALT as string));
    const incodedPassword = bcrypt.hashSync(`${password}${pepper}`, salt);
    const newAdmin = new AdminModel({ ...data, password: incodedPassword });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Edit Admin
export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { editorID, adminID, ...data } = req.body;
    const editor = await AdminModel.findById(editorID);
    if (editor?.fullAccess || adminID === req.params.id) {
      const admin = await AdminModel.findByIdAndUpdate(req.params.id, data);
      res.status(200).json(admin);
    } else {
      res.status(403).json("You don't have Access to Do That!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete Admin
export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const editor = await AdminModel.findById(req.body.editorID);
    if (editor?.fullAccess || req.body.adminID === req.params.id) {
      await AdminModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Admin has been Deleted!");
    } else {
      res.status(403).json("You don't have Access to Do That!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get Admin By ID
export const getAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await AdminModel.findById(req.params.id);
    if (!admin) {
      res.status(404).json("Admin Not Found!");
    } else {
      res.status(200).json(admin);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get All Admins
export const getAllAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Authenticate Admin
export const authenticate = async (req: Request, res: Response) => {
  try {
    const admin: any = await AdminModel.findOne({ email: req.body.email });
    const realPassword = admin.password;
    const isPasswordValid = bcrypt.compareSync(
      `${req.body.password}${PEPPER}`,
      realPassword
    );
    if (isPasswordValid) {
      const accessToken = jwt.sign(
        {
          fullAccess: admin.fullAccess,
          email: admin.email,
          creatorId: admin.creatorId,
        },
        JWT_SEC as unknown as string
      );
      res.status(200).json({ ...admin, accessToken });
    } else {
      res.status(500).json("Wrong Password!");
    }
  } catch (err) {}
};
