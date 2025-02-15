const express = require("express");
const router = express.Router();
const passport = require("passport");

const Admin = require("../models/Admin");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); 
  }
  res.status(401).json({ message: "Unauthorized Access" });
};

router.get("/", async (req, res) => {
  try {
    const data = await Admin.find();
    res.status(200).json(data);
    console.log("User Message Fetched Successfully");
  } catch (err) {
    console.log("Error in Fetching User Message", err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newAdmin = new Admin(data);
    const response = await newAdmin.save();
    console.log("Admin Created Successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error in Creating Admin", err);
    res.status(500).json(err);
  }
});

module.exports = router;
