const express = require('express');
const router = express.Router();

const UserList = require("../models/UserList");

router.post("/", async (req, res) => {
    try{
        const data = req.body;
        const newUser = new UserList(data);
        const response = await newUser.save();
        res.status(200).json(response);
        console.log("User Created Successfully");
    }catch(err) {
        console.log("Error in Creating User", err);
        res.status(500).json(err);

    }
})

router.get("/", async (req, res) => {
    try{
        const data = await UserList.find();
        res.status(200).json(data);
        console.log("User Fetched Successfully");
    }catch(err) {
        console.log("Error in Fetching User", err);
        res.status(500).json(err)

    }
})

module.exports = router;
