const express = require("express");

const mainController = require("./controller");

const router = express.Router();

router.post("/new", mainController.postNewAccount);
router.post("/new/bid", mainController.placeNewBid);
router.get("/all", mainController.getAllAnonUsers);
router.get("/transactions", mainController.getAllTransactions);
router.get("/admin", mainController.getAllUsers);
router.get("/admin/transactions", mainController.getAllOriginalTransactions);

module.exports = router;

