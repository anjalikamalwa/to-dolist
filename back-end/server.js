import express from "express";
import dotenv from "dotenv";
import connectDB from "./dbconfig/dbconnection.js";
import { router } from "./routes/taskroute.js";
import cors from 'cors'

const result = dotenv.config();
const app = express();

connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/tasks",router)
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
