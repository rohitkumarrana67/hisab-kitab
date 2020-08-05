const utility = require("../../../core/utility_functions")

async function createRequestObject(body, params, user_id){
    const id = params.id
    const type = params.type
    const req = {
        user_id : user_id,
        customer_id : id,
        transaction_id : await utility.getNextTransactionId(),
        transaction_type : type,
        ...body
    }
    return req
}

module.exports = {
    createRequestObject
}