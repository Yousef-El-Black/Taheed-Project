import ContractModel from "../models/contract.model";
import { Request, Response } from "express";

// Create a Contract
export const createContract = async (req: Request, res: Response) => {
  try {
    const contract = new ContractModel(req.body);
    await contract.save();
    res.status(201).json(contract);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get Contract
export const getContract = async (req: Request, res: Response) => {
  try {
    const contract = await ContractModel.findById(req.params.id);
    res.status(200).json(contract);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get All Contracts
export const getAllContracts = async (_req: Request, res: Response) => {
  try {
    const contracts = await ContractModel.find();
    res.status(200).json(contracts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get All Contract of One User
export const getUserContracts = async (req: Request, res: Response) => {
  try {
    const contractsIds = req.body.contractsIds;
    const contracts = await ContractModel.find({ _id: { $in: contractsIds } });
    res.status(200).json(contracts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update Contract
export const updateContract = async (req: Request, res: Response) => {
  try {
    const updatedContract = await ContractModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedContract);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete Contract
export const deleteContract = async (req: Request, res: Response) => {
  try {
    await ContractModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Contract Deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
