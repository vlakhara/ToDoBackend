import express from "express";
import jwt from "jsonwebtoken";
import { ToDoModel } from "../models/Todo.js";
import { formatDate } from "../utils/formateDate.js";

const router = express.Router();
router.post("/add", async (req, res) => {
  const { title, completed, priority } = req?.body;
  const createdOn = formatDate(new Date());
  const { token } = req.headers;
  const { id: userId } = jwt.decode(token);

  const todo = new ToDoModel({ title, completed, priority, createdOn, userId });
  try {
    const response = await todo.save();
    res.json({ response, status: "Success" });
  } catch (error) {
    res.json(error);
  }
});

router.get("/get", async (req, res) => {
  const { token } = req.headers;
  const { id } = jwt.decode(token) || { id: null };
  const todos = await ToDoModel.find({ userId: id }).select(
    "_id title createdOn priority completed"
  );
  res.json({ todos, status: "Success", total: todos.length });
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await ToDoModel.deleteOne({ _id: id });
  res.json({ status: "Success", message: "To DO Deleted!!" });
});

router.put("/update", async (req, res) => {
  const { completed, id } = req.body;
  const createdOn = formatDate(new Date());
  const response = await ToDoModel.updateOne(
    { _id: id },
    { completed, createdOn }
  );
  res.json({ response, status: "Success", message: "To DO Updated!!" });
});

export { router as todosRouter };
