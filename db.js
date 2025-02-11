const mongoose = require("mongoose");
require('dotenv').config();


const MONGO_URL = process?.env?.DB_URL;
// const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://saurabh0101906:Pplosdaa02@1234@cluster0.8mvoy.mongodb.net/"

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
