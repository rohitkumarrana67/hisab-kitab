const transactionModel = require("../../db/models/transactions")
const transaction_helper = require("./helper/transaction_helper")
const utility = require("../../core/utility_functions")

module.exports = TransactionDispatcher = function (req_data, user_id) {
    this.req_data = req_data
    this.user_id = user_id
}

TransactionDispatcher.prototype.getTransactionList = async function () {
    const id = this.req_data.params.id
    const res_data = await transactionModel.find({ user_id:this.user_id, customer_id:id })
    return res_data
}

TransactionDispatcher.prototype.createEntry = async function () {
    const req_entry = await transaction_helper.getCreateObject(this.req_data.body, this.req_data.params, this.user_id)
    const res_data = await transactionModel.create(req_entry)
    return res_data
}

TransactionDispatcher.prototype.getBalance = async function () {
    const id = this.req_data.params.id
    const balance = utility.getBalance(this.user_id, id)
    return balance
}

TransactionDispatcher.prototype.updateTransaction = async function () {
    const transaction_id = this.req_data.params.transaction_id
    const filter_obj = {
        transaction_id : transaction_id,
        user_id : this.user_id
    }
    const update_obj = transaction_helper.getUpdateObject(this.req_data.body)
    const res_data = await transactionModel.findOneAndUpdate(filter_obj, update_obj, {new:true})
    return res_data.amount
}

TransactionDispatcher.prototype.deleteTransaction = async function () {
   const transaction = await transactionModel.findOneAndDelete(this.req_data)
   return transaction;
}