const requestValidator = require("../validators/transaction_validator")
const TransactionService = require("../services/transaction_service")
const errorBuilder = require("../entity_builders/error_builder")
const { deleteRequestValidator } = require("../validators/transaction_validator")

module.exports = {

    index : (req, res) => {
        requestValidator.indexRequestValidator(req.params)
        .then( validated_data => {
            const req_data = {
                params : validated_data
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
                params : validated_data[0],
                body : validated_data[1]
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
                params : validated_data
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
    },

    updateTransaction : (req, res) => {
        requestValidator.updateRequestValidator(req.params, req.body)
        .then( validated_data => {
            const req_data = {
                params : validated_data[0],
                body : validated_data[1]
            }
            const transaction_service = new TransactionService(req_data, req.user.user_id)
            return transaction_service.updateTransaction()
        })
        .then( data => {
            res.status(200).send(data)
        })
        .catch( error => {
            errorBuilder(error).then( err => { res.status(err.code).send(err.body) })
        })
    },

    deleteTransaction : (req,res) => {
        // console.log(req.params)
        requestValidator.deleteRequestValidator(req.params)
        .then(validated_data => {
            const data = validated_data[0];
            const transaction_service = new TransactionService(data)
            return transaction_service.deleteTransaction()
        }).then(data => {
            // console.log(data)
            res.status(200).send(data)
        }).catch(error => {
            errorBuilder(error).then( err => { res.status(err.code).send(err.body)})
        })
    }
}
