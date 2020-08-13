const utility = require("../../core/utility_functions");
const { func } = require("joi");

module.exports = CustomerEntityBuilder = function () {
    
}

CustomerEntityBuilder.prototype.create = function (req_data) {
    const { user_id, customer_id, customer_name, email, mobile_number, address } = req_data;
    return { user_id, customer_id, customer_name, email, mobile_number, address };
}

CustomerEntityBuilder.prototype.getCustomers = async function (req_data) {
    res_data = [];
    for(data of req_data){
        const balance = await utility.getBalance(data.user_id, data.customer_id)
        const entity_obj = {
            user_id :data.user_id,
            customer_id : data.customer_id,
            customer_name : data.customer_name,
            email : data.email,
            mobile_number : data.mobile_number,
            address : data.address,
            balance : balance
        }
        res_data.push(entity_obj);
    };
    return res_data;
}

CustomerEntityBuilder.prototype.getCustomerById = function (req_data) {
 const {customer_name,email,mobile_number,address}=req_data;
 return {customer_name,email,mobile_number,address};

}
CustomerEntityBuilder.prototype.updateCustomerById = function(req_data){
    const {customer_name,email,mobile_number,address}=req_data;
    return {customer_name,email,mobile_number,address};
}