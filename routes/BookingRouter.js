const express = require('express');
const router = express.Router();

const BookingOrder = require("../models/BookingOrder");

router.post("/", async (req, res) => {
    try{
        const data = req.body;
        const newBooking = new BookingOrder(data);
        const response = await newBooking.save();
        res.status(200).json(response);
        console.log("Booking Created Successfully");
    }catch(err) {
        console.log("Error in Creating Booking", err);
        res.status(500).json(err);
    }
})

router.get("/", async (req, res) => {
    try{
        const data = await BookingOrder.find();
        res.status(200).json(data);
        console.log("Booking Fetched Successfully");

    }catch(err) {
        console.log("Error in Fetching Booking", err);
        res.status(500).json(err);
    }
})

router.put("/:id", async (req, res) => {
    try{
        const bookingId = req.params.id;
        const updatedBooking = req.body;
        const response = await BookingOrder.findByIdAndUpdate(bookingId, updatedBooking, {
            new : true,
            runValidators : true
        })
        console.log("Booking Updated Successfully");
        res.status(200).json(response);
    }catch(err) {
        console.log("Error in Updating Booking", err);
        res.status(500).json(err);
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const bookingId = req.params.id;
        const response = await BookingOrder.findByIdAndDelete(bookingId);
        console.log("Booking Deleted Successfully");
        res.status(200).json(response);
    }catch(err) {
        console.log("Error in Deleting Booking", err);
        res.status(500).json(err);
    }
})

module.exports = router