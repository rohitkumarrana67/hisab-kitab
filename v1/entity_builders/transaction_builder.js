
module.exports = TransactionBuilder = function (req_data){
    this.req_data = req_data
}

TransactionBuilder.prototype.buildTransactionList = function (entity){
    return entity
}

TransactionBuilder.prototype.buildCreateEntry = function (entity){
    return entity
}
