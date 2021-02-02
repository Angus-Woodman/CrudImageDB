const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  lens: {
    type: String,
  },
  camera: {
    type: String,
  },
  emoji1: {
    type: String,
  },
  emoji2: {
    type: String,
  },
  emoji3: {
    type: String,
  },
  comments: {
    type: Array,
  },
  cloudinary_id: {
    type: String,
  },
});
module.exports = mongoose.model("User", userSchema);