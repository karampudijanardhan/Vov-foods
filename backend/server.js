import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { connectDB } from "./config/db.js";

import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/productRoutes.js";
import visitorRoutes from "./routes/visitor.js";
import reviewRoutes from "./routes/reviews.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API ROUTES
app.use("/api/order", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/visitor", visitorRoutes);
app.use("/api/reviews", reviewRoutes);
// TEST ROUTE
app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

// SERVE FRONTEND
const __dirname = path.resolve();
const distPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(distPath));

// SPA ROUTING
app.use((req, res) => {

  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      message: "API route not found"
    });
  }

  res.sendFile(path.join(distPath, "index.html"));

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});