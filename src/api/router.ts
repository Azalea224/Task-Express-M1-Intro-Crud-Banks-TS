import { Router } from "express";
import {
  getAccounts,
  createAccount,
  deleteAccount,
  updateAccount,
  getAccountByUsernameAndCurrency,
} from "./controller";
const router = Router();
router.get("/accounts", getAccounts);
router.post("/accounts", createAccount);
router.delete("/accounts/:accountID", deleteAccount);
router.put("/accounts/:accountID", updateAccount);
router.get("/accounts/:username", getAccountByUsernameAndCurrency);
export default router;
