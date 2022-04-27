require("dotenv").config();
const mongoose = require("mongoose");
const Anon = require("./models/anon");
const Users = require("./models/user");
const ObjectId = require("mongodb").ObjectID;
const {supress,random, category, categoryBid} = require("./k-anon/index");
const transaction = require("./models/transaction");
const anontransaction = require("./models/anontransaction");


const getAllAnonUsers = async (req, res, next) => {
  const array = await Anon.find({});
  if (array.length == 0) {
    return res.status(404).json({
      message: "No Anon found",
    });
  } else {
    return res.status(200).json({
      message: "Success",
      data: array,
    });
  }
};
const getAllUsers = async (req, res, next) => {
  const array = await Users.find({});
  if (array.length == 0) {
    return res.status(404).json({
      message: "No Anon found",
    });
  } else {
    return res.status(200).json({
      message: "Success",
      data: array,
    });
  }
};

const postNewAccount = async (req, res, next) => {

    try {

        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');

       length = 10
        var id = '';
        for (var i = 0; i < length; i++) {
            id += chars[Math.floor(Math.random() * chars.length)];
        }
      const { aadhar,first,gender,age,state,city,pincode} = req.body;
      const newAccount = new Users({
        _id: new mongoose.Types.ObjectId(),
        aadhar,
        first,
        gender,
        age,
        createdAt: new Date(),
        state,
        city,
        pincode,
        id
      });


      const newAnonAccount = new Anon({
        _id: new mongoose.Types.ObjectId(),
        aadhar:await supress(aadhar),
        first:await random(first),
        gender,
        age: await category(age),
        createdAt: new Date(),
        state,
        city : state,
        pincode:await supress(String(pincode)),
        id
      });
      console.log(newAnonAccount)

      await newAccount
        .save()
      await newAnonAccount
        .save()
      
                return res.status(201).json({
                    data: "success"
                  });

        
    } catch (err) {
      console.log(err)
  
      return res.status(500).json({
        message: "Something went wrong",
        err: err.toString()
      });
    }
  };

  const placeNewBid = async (req, res, next) => {

    try {

        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');

       length = 10
        var id = '';
        for (var i = 0; i < length; i++) {
            id += chars[Math.floor(Math.random() * chars.length)];
        }
      const { item_id,name,initial_bid, selling_bid, credit_card} = req.body;
      const newTransaction= new transaction({
        _id: new mongoose.Types.ObjectId(),
        user_id: id,
        item_id: item_id,
        name: name,
        initial_bid: initial_bid,
        selling_bid: selling_bid,
        credit_card: credit_card
      });


      const newAnonTransaction = new anontransaction({
        _id: new mongoose.Types.ObjectId(),
        user_id: id,
        item_id: item_id,
        name: await random(name),
        credit_card: await supress(credit_card),
        initial_bid: await categoryBid(initial_bid),
        selling_bid: await categoryBid(selling_bid)
      });
      console.log(newAnonTransaction)

      await newTransaction
        .save()
      await newAnonTransaction
        .save()
      
                return res.status(201).json({
                    data: "success"
                  });

        
    } catch (err) {
      console.log(err)
  
      return res.status(500).json({
        message: "Something went wrong",
        err: err.toString()
      });
    }
  };

module.exports ={
    postNewAccount,
    getAllAnonUsers,
    getAllUsers,
    placeNewBid
}
