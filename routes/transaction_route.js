const express = require("express")
const router = express.Router()
const TransactionController = require("../v1/controllers/transaction_controller.js")

router.get("/users/customer/:id", TransactionController.index)
router.post("/users/customer/:id/:type", TransactionController.createEntry)
router.get("/users/customer/balance/:id", TransactionController.getBalance)

module.exports = router