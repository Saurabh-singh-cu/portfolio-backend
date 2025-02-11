const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    unique: false,
  },
  message: {
    required: true,
    type: String,
    trim: true,
  },
});

const UserList = mongoose.model("UserList", userSchema);
module.exports = UserList;
