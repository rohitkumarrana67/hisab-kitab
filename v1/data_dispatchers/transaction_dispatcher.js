const transactionModel = require("../../db/models/transactions")
const helper = require("./helper/helper")
const utility = require("../../core/utility_functions")

module.exports = TransactionDispatcher = function (req_data, user_id) {
    this.req_data = req_data
    this.user_id = user_id
}

TransactionDispatcher.prototype.getTransactionList = async function () {
    const id = this.req_data.params.id
    const res_data = await transactionModel.find({user_id:this.user_id, customer_id:id })
    return res_data
}

TransactionDispatcher.prototype.createEntry = async function () {
    const req_entry = await helper.createRequestObject(this.req_data.body, this.req_data.params, this.user_id)
    const res_data = await transactionModel.create(req_entry)
    return res_data
}

TransactionDispatcher.prototype.getBalance = async function () {
    const id = this.req_data.params.id
    const balance = utility.getBalance(this.user_id, id)
    return balance
}
 