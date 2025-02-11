const mongoose = require("mongoose");

const bookingOrderSchema = new mongoose.Schema({
  order_id: {
    required: true,
    unique: true,
    type: String,
    trim: true,
  },
  customer_name: {
    required: true,
    type: String,
    trim: true,
  },
  item_ordered : {
    required : true,
    type : String
  },
  price : {
    required : true,
    type : Number,
  },
});

const BookingOrder = mongoose.model('BookingOrder', bookingOrderSchema);
module.exports = BookingOrder;

