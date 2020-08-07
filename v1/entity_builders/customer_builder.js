const utility = require("../../core/utility_functions")

module.exports = CustomerEntityBuilder = function () {
    
}

CustomerEntityBuilder.prototype.create = function (req_data) {
    const { user_id, customer_id, customer_name, email, mobile_number, address } = req_data;
    return { user_id, customer_id, customer_name, email, mobile_number, address };
}

CustomerEntityBuilder.prototype.getCustomers = function (req_data) {
    res_data = [];
    req_data.forEach(data => {
        const { user_id, customer_id, customer_name, email, mobile_number, address, balance } = {...data, ...utility.getBalance(data.user_id, data.customer_id)};
        res_data.push({ user_id, customer_id, customer_name, email, mobile_number, address, balance });
    });
    return res_data;
}