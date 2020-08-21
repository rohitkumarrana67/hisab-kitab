const { customerCreateValidator, getCustomerByIdValidator, updateCustomerByIdValidator, deleteCustomerByIdValidator } = require("../validators/customer_validators");
const errorBuilder = require("../entity_builders/error_builder");
const Service = require("../services/customer_service");

module.exports = {

    createCustomer: (req, res) => {
        customerCreateValidator(req.body)
            .then(data => {
                const CustomerService = new Service(data, req.user);
                return CustomerService.create(data);
            })
            .then(data => {
                res.status(201).send(data);
            })
            .catch(error => {
                errorBuilder(error).then((error) => { res.status(error.code).send(error.body) })
            })
    },

    getCustomers: (req, res) => {
        const CustomerService = new Service();
        CustomerService.getCustomers(req.user)
            .then(data => {
                res.status(201).send(data);
            })
            .catch(error => {
                errorBuilder(error).then((error) => { res.status(error.code).send(error.body) })
            });
    },

    getCustomerById: (req, res) => {
        getCustomerByIdValidator(req.params)
            .then(data => {
                const CustomerService = new Service(data, req.user);
                return CustomerService.getCustomerById(data);
            })
            .then(data => {
                res.status(201).send(data);
            })
            .catch(error => {
                errorBuilder(error).then((error) => { res.status(error.code).send(error.body) })
            })
    },

    updateCustomerById: (req, res) => {
        updateCustomerByIdValidator(req.params, req.body)
            .then(validated_data => {
                const req_data = {
                    params: validated_data[0],
                    body: validated_data[1]
                }
                const CustomerService = new Service(req_data, req.user);
                return CustomerService.updateCustomerById();
            })
            .then(data => {
                res.status(201).send(data);
            })
            .catch(error => {
                errorBuilder(error).then((error) => { res.status(error.code).send(error.body) })
            })
    },

    deleteCustomerById: (req, res) => {
        deleteCustomerByIdValidator(req.params).then(validated_data => {
            const CustomerService = new Service(validated_data, req.user);
            return CustomerService.deleteCustomerById();
        }).then((data) => {
            res.status(201).send({ success: true });
        }).catch(error => {
            errorBuilder(error).then((error) => { res.status(error.code).send(error.body) })
        })
    },

    deleteAllCustomer: (req, res) => {
    }

}