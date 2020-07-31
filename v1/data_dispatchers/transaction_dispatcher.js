const transactionModel = require("../../db/models/transactions")

module.exports = TransactionDispatcher = function (req_data) {
    this.req_data = req_data
}

TransactionDispatcher.prototype.getTransactionList = async function () {
    const id = this.req_data.params.id

    const res_data = transactionModel.find({customer_id:id})
    return res_data
}

TransactionDispatcher.prototype.createEntry = async function () {
    const id = this.req_data.params.id
    const type = this.req_data.params.type
    const req_entry = this.req_data.body
    req_entry['customer_id'] = id
    req_entry['transaction_type'] = type

    const res_data = transactionModel.create(req_entry)
    return res_data
}
