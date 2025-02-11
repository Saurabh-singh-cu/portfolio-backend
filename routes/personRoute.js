const express = require("express");
const router = express.Router();

const Person = require("../models/Person");


router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    res.status(200).json(response);
    console.log("Person Created Successfully");
  } catch (err) {
    console.log("Error in Creating Person", err);
    res.status(500).json({ message: "Internal Server Error", err });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
    console.log("Person Data Fetched Successfully");
  } catch (err) {
    console.log("Error in Fetching Person Data", err);
    res.status(500).json(err);
  }
});

router.get("/:workType/", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      (workType && workType == "manager") ||
      workType == "waiter" ||
      workType == "cheif"
    ) {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
      console.log("Person Data Fetched Successfully");
    } else {
      res.status(404).json({ message: "Invalid Work Type" });
    }
  } catch (err) {
    console.log("Error in Fetching Person Data", err);
    res.status(500).json(err);
  }
});

router.put("/:id" , async (req, res) => {
    try{
        const personId = req.params.id;
        const updatedPersonId = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonId, {
            new : true,
            runValidators : true
        })

        if(!response) {
            res.status(404).json({ message : "Person Not Found"});
        }
        res.status(200).json(response);
        console.log("Person Updated Successfully");
    }catch(err) {
        console.log("Error in Updating Person", err);
        res.status(500).json(err);
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if(!response) {
            res.status(404).json({ message : "Person Not Found"});
        }
        res.status(200).json(response);
        console.log("Person Deleted Successfully");
        
    }catch(err) {
        res.status(500).json(err);
        console.log("Error in Deleting Person", err);
    }
})

module.exports = router