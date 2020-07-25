const CustomerDispatcher = require("../data_dispatchers/customer_dispatcher");
const CustomerEntityBuilder = require("../entity_builders/customer_builder");

module.exports = CustomerService = function () {
    this.dispatcher = new CustomerDispatcher();
    this.builder = new CustomerEntityBuilder();
}

CustomerService.prototype.create = async function (req_data) {
    const dispatcher_data = await this.dispatcher.create(req_data);
    return this.builder.create(dispatcher_data);
} 