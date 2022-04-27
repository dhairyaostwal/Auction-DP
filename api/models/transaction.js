const mongoose = require("mongoose");

const Transaction = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id : {type:String},
  item_id :{type:String},
  name : {type:String},
  initial_bid :{type:Number},
  selling_bid :{type:Number},
  credit_card :{type:String}
});

module.exports = mongoose.model("Transactions", Transaction);
