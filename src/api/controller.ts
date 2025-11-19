import { Request, Response } from "express";
import { Account } from "../schema/Account";

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    const newAccount = new Account(req.body);
    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to create account" });
    }
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { accountID } = req.params;
    const deletedAccount = await Account.findByIdAndDelete(accountID);
    if (deletedAccount) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete account" });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    const { accountID } = req.params;
    const { username, funds } = req.body;
    const updatedAccount = await Account.findByIdAndUpdate(
      accountID,
      { username, funds },
      { new: true, runValidators: true }
    );
    if (updatedAccount) {
      res.status(200).json(updatedAccount);
    } else {
      res.status(404).json({ error: "Account not found" });
    }
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to update account" });
    }
  }
};

export const getAccountByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const account = await Account.findOne({ username });
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ error: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch account" });
  }
};

export const getAccountByUsernameAndCurrency = async (
  req: Request,
  res: Response
) => {
  try {
    const { username } = req.params;
    const { currency } = req.query;
    const account = await Account.findOne({ username });
    if (account) {
      if (
        currency &&
        typeof currency === "string" &&
        currency.toLowerCase() === "usd"
      ) {
        const converted = {
          ...account.toJSON(),
          funds: account.funds * 3.25,
        };
        res.status(200).json(converted);
      } else {
        res.status(200).json(account);
      }
    } else {
      res.status(404).json({ error: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch account" });
  }
};
