const mongoose = require("mongoose");

const anonTransaction = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id : {type:String},
  item_id :{type:String},
  name : {type:String},
  initial_bid :{type:String},
  selling_bid :{type:String},
  credit_card :{type:String}
});

module.exports = mongoose.model("AnonTransactions", anonTransaction);
