import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";   // 👈 ADD THIS
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// 🔥 REAL FIX — use body-parser instead of express.json()
app.use(cors());
app.use(bodyParser.json());              // 👈 THIS FIXES req.body
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/order", orderRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
