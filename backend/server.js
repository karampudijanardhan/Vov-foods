import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./config/db.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/order", orderRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔥 serve React dist
app.use(express.static(path.join(__dirname, "dist")));

// 🔥 SPA fallback — Express 5 safe
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", PORT);
});
