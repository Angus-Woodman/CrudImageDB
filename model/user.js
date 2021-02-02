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
  emojis: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  cloudinary_id: {
    type: String,
  },
});
module.exports = mongoose.model("User", userSchema);