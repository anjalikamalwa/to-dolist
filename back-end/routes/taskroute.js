import express from "express";
import { addTask, deleteTask, getTasks } from "../controllers/taskController.js";

export const router = express.Router();
router.route("/addtask").post(addTask);
router.route("/").get(getTasks);
router.route("/:id").delete(deleteTask);
