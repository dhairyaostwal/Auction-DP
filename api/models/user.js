const mongoose = require("mongoose");

const User = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id : {type:String},
  aadhar: { type: String },
  first: { type: String },
  gender: { type: String },
  age: { type: Number },
  state: { type: String },
  city: { type: String },
  pincode: { type: String },
  mobile:{type:String},
  createdAt: {type: Date}
});

module.exports = mongoose.model("users", User);
