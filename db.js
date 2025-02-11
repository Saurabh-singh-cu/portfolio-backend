const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/hotel";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {});

    console.log("Connected to MongoDB server");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from DB");
});

module.exports = connectDB;
