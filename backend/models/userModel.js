const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { 
        type: "String", 
        required: true 
    },
    email: { 
        type: "String", 
        unique: true, 
        required: true 
    },
    password: { 
        type: "String", 
        required: true 
    },
    pic: {
      type: "String",
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { 
    timestaps: true 
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;