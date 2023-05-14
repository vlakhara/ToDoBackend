import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import { userRouter } from "./routes/users.js";
import { todosRouter } from "./routes/todos.js";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3001, () => {
  console.log("Server Started on 3001");
});

app.use("/auth", userRouter);
app.use("/todo", todosRouter);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then((res) => {
    console.log({ res });
  })
  .catch((err) => console.log({ err }));
