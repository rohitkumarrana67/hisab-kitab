const utility = require("../../core/utility_functions")

module.exports = TransactionBuilder = function (req_data){
    this.req_data = req_data
}

TransactionBuilder.prototype.buildTransactionList = function (entity){
    const res_data = []
    for(entry of entity){
        let entry_obj = {
            transaction_id : entry.transaction_id,
            message : entry.message
        }
        if(entry.transaction_type === "take"){
            entry_obj.amount = (-1 * entry.amount)
        } else {
            entry_obj.amount = entry.amount
        }
        res_data.push(entry_obj)
    }
    return res_data
}

TransactionBuilder.prototype.buildCreateEntry = async function (entity){
    const balance = await utility.getBalance(entity.user_id, entity.customer_id)
    return {balance}
}

TransactionBuilder.prototype.buildBalance = function (balance) { 
    return {balance}
}
