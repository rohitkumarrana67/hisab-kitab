const CustomerModel = require("../../db/models/customer");
const { recordNotFoundError } = require("../../core/utility_functions");
var uuid = require('uuid-random');

module.exports = CustomerDispatcher = function (req_data, user_info) {
    this.user_info = user_info
}

CustomerDispatcher.prototype.create = async function (req_data) {
    const customer_id = uuid();
    req_data.customer_id = customer_id;
    req_data.user_id = this.user_info.user_id;
    const customer = new CustomerModel(req_data);
    return await customer.save();
}

CustomerDispatcher.prototype.getCustomers = async function (req_data) {

    const customers = await CustomerModel.find({ user_id: req_data.user_id });
    if (customers) {
        return customers;
    } else {
        throw recordNotFoundError("No customers");
    }
}