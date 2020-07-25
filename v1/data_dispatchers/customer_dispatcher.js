const CustomerModel = require("../../db/models/customer");
var uuid = require('uuid-random');

module.exports = CustomerDispatcher = function () {

}

CustomerDispatcher.prototype.create = async function (req_data) {
    const customer_id = uuid();
    req_data.customer_id = customer_id;
    const customer = new CustomerModel(req_data);
    return await customer.save();
}