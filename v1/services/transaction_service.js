const TransactionDispatcher = require("../data_dispatchers/transaction_dispatcher")
const TransactionEntityBuilder = require("../entity_builders/transaction_builder")


module.exports = TransactionService = function(req_data){
    this.disaptcher = new TransactionDispatcher(req_data)
    this.entity_builder = new TransactionEntityBuilder(req_data)
}

TransactionService.prototype.getTransactionList = async function () {
    const dispatcher_data = await this.disaptcher.getTransactionList()
    return this.entity_builder.buildTransactionList(dispatcher_data)
}

TransactionService.prototype.createEntry = async function () {
    const dispatcher_data = await this.disaptcher.createEntry()
    return this.entity_builder.buildCreateEntry(dispatcher_data)
}