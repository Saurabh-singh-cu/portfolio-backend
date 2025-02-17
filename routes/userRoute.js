const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();

const UserList = require("../models/UserList");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newUser = new UserList({ name, email, message });
    const response = await newUser.save();

    const mailOption = {
      from: process.env.USER_EMAIL,
      to: "saurabh.e15299@cumail.in",
      text: `You have received a new message from:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    await transporter.sendMail(mailOption);

    res
      .status(200)
      .json({ message: "User created and email sent successfully!", response });
    console.log("User Created Successfully & Email Sent");
  } catch (err) {
    console.log("Error in Creating User or Sending Email", err);
    res.status(500).json({ error: "Error saving user or sending email" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await UserList.find();
    res.status(200).json(data);
    console.log("User Messages Fetched Successfully");
  } catch (err) {
    console.log("Error in Fetching User Messages", err);
    res.status(500).json({ error: "Error fetching user messages" });
  }
});
console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded");

// router.post("/", async (req, res) => {
//   try {
//     const data = req.body;
//     const newUser = new UserList(data);
//     const response = await newUser.save();
//     res.status(200).json(response);
//     console.log("User Created Successfully");
//   } catch (err) {
//     console.log("Error in Creating User", err);
//     res.status(500).json(err);
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const data = await UserList.find();
//     res.status(200).json(data);
//     console.log("User Fetched Successfully");
//   } catch (err) {
//     console.log("Error in Fetching User", err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
