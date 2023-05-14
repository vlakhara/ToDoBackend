import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdOn: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const ToDoModel = mongoose.model("ToDo", ToDoSchema);
