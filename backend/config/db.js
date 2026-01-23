import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // 🔹 keep your fallback URI logic
    const mongoURI =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/vovfoods";

    // 🔧 FIX: remove unsupported options
    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  }
};

// 🔹 your debug listeners (keep as-is)
mongoose.connection.on("connected", () => {
  console.log("🟢 Mongoose connection open");
});

mongoose.connection.on("error", (err) => {
  console.error("🔴 Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("🟠 Mongoose disconnected");
});
