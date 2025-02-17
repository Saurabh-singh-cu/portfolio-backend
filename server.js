const express = require("express");
const app = express();
const connectDB = require("./db");
const nodemailer = require("nodemailer");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Middleware


const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request received for ${req.originalUrl}`);
  next();
};
app.use(logRequest);

// Corrected CORS Configuration
const allowOrigin = [
  "http://localhost:3000",
  "https://harmonious-llama-0bcd0f.netlify.app",
  "https://celadon-phoenix-57fa69.netlify.app/",
];

app.use(
  cors({
    origin: allowOrigin,
    credentials: true, // Important for cookies/auth
    methods: "GET,POST,PUT,DELETE", // Explicitly define allowed methods
    allowedHeaders: "Content-Type, Authorization"
  })
);



app.options("*", cors()); // Handles preflight requests
app.use(bodyParser.json());
app.use(express.json()); // Move this up, before routes
// Routes
const menuItemRouter = require("./routes/menuItemRouter");
const personRoute = require("./routes/personRoute");
const bookingRouter = require("./routes/BookingRouter");
const userRouter = require("./routes/userRoute");
const AdminRoute = require("./routes/AdminRoute");

app.use("/menu-item", menuItemRouter);
app.use("/person", personRoute);
app.use("/booking", bookingRouter);
app.use("/user", userRouter);
app.use("/admin", AdminRoute)

connectDB();
console.log("Current Working Directory:", process.cwd());
console.log("Environment Variables:", process.env);


app.get("/", function (req, res) {
  res.send("hello world");
});

// Start server
const PORT = process.env.PORT || 5000; // Change default port to 5000 for better backend/frontend separation
app.listen(PORT, () => {
  console.log("Server Listening on:", PORT);
});
