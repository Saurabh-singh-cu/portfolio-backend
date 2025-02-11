const express = require('express');
const router = express.Router();
const MenuItem = require("../models/MenuItems");


router.post("/", async (req, res) => {
    try{
      const data = req.body;
      const newMenuItems = new MenuItem(data);
      const response = await newMenuItems.save();
      res.status(200).json(response);
      console.log("Menu Item Created Successfully");
    }catch(err) {
      console.log("Error in Creating Menu Item", err);
      res.status(500).json(err);
    }
  }) 
  
  router.get("/", async (req, res) => {
    try{
      const data = await MenuItem.find();
      res.status(200).json(data);
      console.log("Menu Item Fetched Successfully");
    }catch(err) {
      console.log("Error in Fetching Menu Item", err);
      res.status(500).json(err);
    }
  })
  
  router.get("/:categoryType", async (req, res) => {
    try {
      const categoryType = req.params.categoryType;
      if(categoryType && categoryType =='veg' || categoryType == 'non-veg') {
        const newMenuItem = await MenuItem.find({category : categoryType});
        res.status(200).json(newMenuItem);
        console.log("Menu Item Fetched Successfully");
  
      } else {
        res.status(404).json({message : "Invalid Category"});
      }
  
    }catch(err) {
      console.log("Error in Fetching Menu Item", err);
      res.status(500).json(err);
    }
  })

  router.put("/:id", async (req, res) => {
    try {
        const menuId = res.params.id;
        const updatedMenu = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenu, {
            new : true,
            runVali
        })
    }catch(err) {
        console.log("Error in Updating Menu Item", err);
        res.status(500).json(err);
    }
  })

  module.exports = router;