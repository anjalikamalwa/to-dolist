import mongoose from "mongoose";
const taskSchema = mongoose.Schema(
  {
    taskname: {
      type: String,
      required: [true, "Please add the Task name"],
    },
    description: {
      type: String,
      required: [true, "Please add the task description"],
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
