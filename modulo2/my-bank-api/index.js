import express from "express";
import accountsRouter from "./routes/accounts.js";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;
global.fileName = "accounts.json";

const app = express();
app.use(express.json());
app.use("/account", accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    console.log("API Started!");
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile("accounts.json", JSON.stringify(initialJson, null, 2))
      .then(() => {
        console.log("API Started and file Created!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
