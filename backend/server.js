import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/auth.js"; // 🔹 ADDITION: auth routes
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// 🔹 EXISTING ROUTES (unchanged)
app.use("/api/order", orderRoutes);

// 🔹 ADDITION: AUTH ROUTES (signup + login)
app.use("/api/auth", authRoutes);

// 🔹 OPTIONAL: health check route (safe add)
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
