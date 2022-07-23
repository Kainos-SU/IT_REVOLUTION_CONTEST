const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  role: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("users", userSchema);
