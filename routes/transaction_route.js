const express = require("express")
const router = express.Router()
const TransactionController = require("../v1/controllers/transaction_controller.js")
const Auth = require("../core/authenticator");

router.get("/users/customer/:id", Auth, TransactionController.index)
router.post("/users/customer/:id/:type", Auth, TransactionController.createEntry)
router.get("/users/customer/balance/:id", Auth, TransactionController.getBalance)

module.exports = router