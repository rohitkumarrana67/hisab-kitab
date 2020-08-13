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
    return await this.builder.getCustomers(dispatcher_data);
} 

CustomerService.prototype.getCustomerById = async function () {
    const dispatcher_data = await this.dispatcher.getCustomerById();
    return this.builder.getCustomerById(dispatcher_data);
} 

CustomerService.prototype.updateCustomerById=async function (){
    const dispatcher_data=await this.dispatcher.updateCustomerById();
    return this.builder.updateCustomerById(dispatcher_data);
}