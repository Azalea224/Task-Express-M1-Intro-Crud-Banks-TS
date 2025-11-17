import express from "express";
import accounts from "../accounts";
import type { Request, Response } from "express";
const app = express();
app.get("/accounts", (req: Request, res: Response) => {
  res.status(200).json(accounts);
});
app.post("/accounts", (req: Request, res: Response) => {
  const newAccount = req.body;
  const maxId =
    accounts.length > 0 ? Math.max(...accounts.map((acc) => acc.id)) : 0;
  const accountWithId = { ...newAccount, id: maxId + 1 };
  accounts.push(accountWithId);
  res.status(201).json(accountWithId);
});
app.delete("/accounts/:accountID", (req: Request, res: Response) => {
  const { accountID } = req.params;
  const index = accounts.findIndex((acc) => acc.id === parseInt(accountID));
  if (index !== -1) {
    accounts.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Account not found" });
  }
});
app.put("/accounts/:accountID", (req: Request, res: Response) => {
  const { accountID } = req.params;
  const { username, funds } = req.body;
  const account = accounts.find((acc) => acc.id === parseInt(accountID));
  if (account) {
    account.username = username;
    account.funds = funds;
    res.status(200).json(account);
  } else {
    res.status(404).json({ error: "Account not found" });
  }
});
app.get("/accounts/:username", (req: Request, res: Response) => {
  const { username } = req.params;
  const { currency } = req.query;
  const account = accounts.find((acc) => acc.username === username);
  if (account) {
    if (
      currency &&
      typeof currency === "string" &&
      currency.toLowerCase() === "usd"
    ) {
      const converted = { ...account, funds: account.funds / 3.25 };
      res.status(200).json(converted);
    } else {
      res.status(200).json(account);
    }
  } else {
    res.status(404).json({ error: "Account not found" });
  }
});
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
