const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:[true, "user name already exists"],
    required: [true, "user name required"]
  },
  email:{
    type:String,
    unique:[true, "Email name already exists"],
    required: [true, "Email name required"]
  },
  password:{
    type:String,
    required: [true, "password name required"]
  },
   bio:{
    type:String,
  },
  profileImage:{
    type:String,
    default:"https://ik.imagekit.io/fi3m2px5p/default-avatar-profile-social-media-260nw-1920331226.webp"
  }
})


const userModel = mongoose.model("users", userSchema)

module.exports = userModel