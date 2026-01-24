import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// middleware  ✅ FIX HERE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/order", orderRoutes);
app.use("/api/auth", authRoutes);

// health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
