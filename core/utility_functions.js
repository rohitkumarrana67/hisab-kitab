const counter = require("../db/models/counter")
const transaction = require("../db/models/transactions")

exports.getBalance = async function (user_id, customer_id){
    const transactions = await transaction.find({ user_id:user_id, customer_id:customer_id })
    var balance = 0
    for(let entry of transactions){
        if(entry.transaction_type === "take"){
            balance += (-1 * entry.amount)
        }
        else if(entry.transaction_type === "give"){
            balance += entry.amount
        }
    }
    return balance
}

exports.getNextTransactionId = async function () {
    const sequence = await counter.findOne({_id : "transaction_id"})
    if(sequence){
        const sequenceDocument = await counter.findOneAndUpdate({_id : sequence._id}, {$inc:{sequence_value:1}}, {new:true})
        return sequenceDocument.sequence_value
    }
    else{
        const sequenceDocument = await counter.create({_id : "transaction_id", sequence_value:1})
        return sequenceDocument.sequence_value
    }
}


exports.recordNotFoundError = function (message) {
    error = new Error()
    error.name = 'Record Not Found'
    error.message = message
    error.code = 404
    return error
}

exports.unprocessableEntityError = function (message) {
    error = new Error()
    error.name = 'Unprocessable Data'
    error.message = message
    error.code = 422
    return error
}

exports.conflictError = function (message) {
    error = new Error()
    error.name = 'conflict Error'
    error.message = message
    error.code = 409
    return error
}

exports.unauthorizedError = function (message) {
    error = new Error()
    error.name = 'Unauthorized Action'
    error.message = message
    error.code = 403
    return error
}
