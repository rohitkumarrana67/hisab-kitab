const CustomerModel = require("../../db/models/customer");
const TransactionModel = require("../../db/models/transactions");
const { recordNotFoundError } = require("../../core/utility_functions");
var uuid = require('uuid-random');
const { collection } = require("../../db/models/customer");

module.exports = CustomerDispatcher = function (req_data, user_info) {
    this.user_info = user_info;
    this.req_data = req_data;
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
    // console.log(customers);
    if (customers) {
        return customers;
    } else {
        throw recordNotFoundError("No customers");
    }
}

CustomerDispatcher.prototype.getCustomerById = async function () {

    const filter = { customer_id: this.req_data.customer_id, user_id: this.user_info.user_id }
    const customer = await CustomerModel.findOne(filter);
    if (!customer) {
        throw recordNotFoundError("No such customer found");
    }
    return customer;
}

CustomerDispatcher.prototype.updateCustomerById = async function () {

    const filter = { customer_id: this.req_data.params.id, user_id: this.user_info.user_id }
    const { customer_name, email, mobile_number, address } = this.req_data.body;
    const update_object = { $set: { customer_name, email, mobile_number, address } };
    const customer = await CustomerModel.findOneAndUpdate(filter, update_object, { new: true });
    return customer;
}

CustomerDispatcher.prototype.deleteCustomerById = async function () {
    const filter = { customer_id: this.req_data.customer_id, user_id: this.user_info.user_id }

    const customer = await CustomerModel.findOne(filter)
    if (!customer) {
        throw recordNotFoundError("no such customer")
    }
    return await Promise.all([
        await CustomerModel.findOneAndDelete(filter),
        await TransactionModel.deleteMany(filter)
    ])
}
