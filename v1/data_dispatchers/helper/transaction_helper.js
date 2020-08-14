const utility = require("../../../core/utility_functions")

async function getCreateObject(body, params, user_id){
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

function getUpdateObject(body){
    const update_obj = {$set : {}}
    for(key of Object.keys(body)){
        update_obj['$set'][key] = body[key]
    }
    return update_obj
}

module.exports = {
    getCreateObject,
    getUpdateObject
}