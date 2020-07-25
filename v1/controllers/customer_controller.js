const { customerCreateValidator } = require("../validators/customer_validators");
const errorBuilder = require("../entity_builders/error_builder");
const Service = require("../services/customer_service");

module.exports = {

    createCustomer: (req, res) => {
        customerCreateValidator(req.body).then(data => {
            const CustomerService = new Service();
            return CustomerService.create(data);
        }).then(data => {
            res.status(201).send(data);
        }).catch(error => {
            errorBuilder(error).then((error) => {
                res.status(error.code).send(error.body)

            })
        })

    },
    getCustomerById: (req, res) => {

    },
    getCustomers: (req, res) => {

    },
    updateCustomerById: (req, res) => {

    },
    deleteCustomerByid: (req, res) => {

    },
    deleteAllCustomer: (req, res) => {

    }

}