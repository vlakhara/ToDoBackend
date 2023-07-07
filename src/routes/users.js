import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req?.body;

  const user = await userModel.findOne({ username });

  if (user) {
    return res.json({ message: "Username already taken", status: "Failed" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({ username, password: hashedPassword });

  await newUser.save();

  res.json({ message: "User registered", status: "Success" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req?.body;

  const user = await userModel.findOne({ username });
  if (!user) {
    return res.json({ message: "User doesn't exist", status: "Failed" });
  }

  const isPasswordValid = await bcrypt.compare(password, user?.password);

  if (!isPasswordValid) {
    return res.json({
      message: "Username or Password is incorrect",
      status: "Failed",
    });
  }

  const token = jwt.sign({ id: user?._id }, "secret");

  res.json({ token, userId: user?._id, status: "Success" });
});

export { router as userRouter };
