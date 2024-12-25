const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name should be atleast 3 character long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name should be atleast 3 character long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: [5, "Email should be atleast 5 character long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "colur must be atleast 3 character long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 character long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be atleast 1"],
    },
    vehicleType: {
      type: String,
      enum: ["car", "motorcycle","auto"],
      required: true,
    },
    location:{
      lat:{
        type:Number
      },
      lng:{
        type:Number
      }
    }
  }
});


captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_is:this._id},process.env.JWT_SECRET,{expiresIn:"24h"});
  return token;
}
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model("caption", captainSchema);

module.exports = captainModel;