const express = require("express");
const app = express();
const connectDB = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const menuItemRouter = require("./routes/menuItemRouter");
app.use("/menu-item", menuItemRouter);

const personRoute = require("./routes/personRoute");
app.use("/person", personRoute);

const bookingRouter = require("./routes/BookingRouter");
app.use("/booking", bookingRouter);

const userRouter = require("./routes/UserRoute");
app.use("/user", userRouter);


connectDB();
app.use(express.json());
app.get("/", function (req, res) {
  res.send("hello world");
});

const port = 3000;
app.listen(3000, () => {
  console.log("Server Listining on :", port);
});
