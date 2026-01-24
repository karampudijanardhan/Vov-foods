import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// 📝 SIGNUP
router.post("/signup", async (req, res) => {
  try {
    console.log("REQ BODY 👉", req.body);

    const { username, password } = req.body || {};

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
  console.error("🔥 REAL Signup error:", err);

  return res.status(500).json({
    message: "Signup failed",
    error: err.message,
    name: err.name,
    code: err.code
  });
}

});


// 🔐 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, username: user.username }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
