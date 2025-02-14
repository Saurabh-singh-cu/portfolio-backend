const express = require("express");
const app = express();
const connectDB = require("./db");
require("dotenv").config();
const cors = require("cors");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

//middle ware

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request received for ${req.originalUrl}`
  );
  next();
};
app.use(logRequest);

const allowOrigin = [
  "http://localhost:3000",
  "https://harmonious-llama-0bcd0f.netlify.app/",
];

app.use(cors({ origin: allowOrigin, credentials: true }));

const menuItemRouter = require("./routes/menuItemRouter");
const personRoute = require("./routes/personRoute");
const bookingRouter = require("./routes/BookingRouter");
const userRouter = require("./routes/userRoute");

app.use("/menu-item", menuItemRouter);
app.use("/person", personRoute);
app.use("/booking", bookingRouter);
app.use("/user", userRouter);

connectDB();
app.use(express.json());
app.get("/", function (req, res) {
  res.send("hello world");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server Listining on :", PORT);
});
