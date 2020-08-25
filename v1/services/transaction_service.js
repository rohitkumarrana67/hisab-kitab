const TransactionDispatcher = require("../data_dispatchers/transaction_dispatcher")
const TransactionEntityBuilder = require("../entity_builders/transaction_builder")


module.exports = TransactionService = function(req_data, user_id){
    this.disaptcher = new TransactionDispatcher(req_data, user_id)
    this.entity_builder = new TransactionEntityBuilder(req_data)
}

TransactionService.prototype.getTransactionList = async function () {
    const dispatcher_data = await this.disaptcher.getTransactionList()
    return this.entity_builder.buildTransactionList(dispatcher_data)
}

TransactionService.prototype.createEntry = async function () {
    const dispatcher_data = await this.disaptcher.createEntry()
    return await this.entity_builder.buildCreateEntry(dispatcher_data)
}

TransactionService.prototype.getBalance = async function () {
    const dispatcher_data = await this.disaptcher.getBalance()
    return this.entity_builder.buildBalance(dispatcher_data)
}

TransactionService.prototype.updateTransaction = async function () {
    const dispatcher_data = await this.disaptcher.updateTransaction()
    return this.entity_builder.buildBalance(dispatcher_data)
}

TransactionService.prototype.deleteTransaction = async function () {
    const dispatcher_data = await this.disaptcher.deleteTransaction()
    return this.entity_builder.buildDelete(dispatcher_data);
}