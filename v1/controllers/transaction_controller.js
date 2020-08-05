const requestValidator = require("../validators/transaction_validator")
const TransactionService = require("../services/transaction_service")
const errorBuilder = require("../entity_builders/error_builder")

module.exports = {

    index : (req, res) => {
        requestValidator.indexRequestValidator(req.params)
        .then( validated_data => {
            const req_data = {
                params : validated_data.value
            }
            const transaction_service = new TransactionService(req_data, req.user.user_id)
            return transaction_service.getTransactionList()
        })
        .then( data => {
            res.status(200).send(data)
        })
        .catch( error => {
            errorBuilder(error).then( err => { res.status(err.code).send(err.body) })
        })
    },

    createEntry : (req, res) => {
        requestValidator.createEntryValidator(req.params, req.body)
        .then( validated_data => {
            const req_data = {
                params : validated_data[0].value,
                body : validated_data[1].value
            }
            const transaction_service = new TransactionService(req_data, req.user.user_id)
            return transaction_service.createEntry()
        })
        .then( entry => {
            res.status(201).send(entry)
        })
        .catch( error => {
            errorBuilder(error).then( err => { res.status(err.code).send(err.body) })
        })
    },

    getBalance : (req, res) => {
        requestValidator.balanceRequestValidator(req.params)
        .then( validated_data => {
            const req_data = {
                params : validated_data.value
            }
            const transaction_service = new TransactionService(req_data, req.user.user_id)
            return transaction_service.getBalance()
        })
        .then( data => {
            res.status(200).send(data)
        })
        .catch( error => {
            errorBuilder(error).then( err => { res.status(err.code).send(err.body) })
        })
    }
}