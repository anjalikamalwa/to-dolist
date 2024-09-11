import asyncHandler from "express-async-handler";
import { Task } from "../models/taskmodel.js";


// @desc Get all tasks
// @route GET /api/tasks
// @access public
export const getTasks = asyncHandler(async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching Tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// @desc  add task in to do list 
// @route POST /api/addtask
// @access public
export const addTask = asyncHandler(async (req, res) => {
  const { taskname, description } = req.body;
  if (!taskname || !description) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const task = await Task.create({
    taskname,
    description,
  });
  res.json({ message: "Task added successfully" });
});



// @desc Delete a Task by ID
// @route DELETE /api/tasks/:id
// @access public
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not Found" });
  }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task removed successfully" });
});