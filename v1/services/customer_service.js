const CustomerDispatcher = require("../data_dispatchers/customer_dispatcher");
const CustomerEntityBuilder = require("../entity_builders/customer_builder");

module.exports = CustomerService = function (req_data, user_info) {
    this.user_info = user_info;
    this.dispatcher = new CustomerDispatcher(req_data, user_info);
    this.builder = new CustomerEntityBuilder();
}

CustomerService.prototype.create = async function (req_data) {
    const dispatcher_data = await this.dispatcher.create(req_data);
    return this.builder.create(dispatcher_data);
}

CustomerService.prototype.getCustomers = async function (req_data) {
    const dispatcher_data = await this.dispatcher.getCustomers(req_data);
    return this.builder.getCustomers(dispatcher_data);
} 