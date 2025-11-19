import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import router from "./api/router";

dotenv.config({ path: "./DB.env" });

const app = express();

app.use(express.json());
app.use("/", router);
const startServer = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");
    const PORT = 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

startServer();
