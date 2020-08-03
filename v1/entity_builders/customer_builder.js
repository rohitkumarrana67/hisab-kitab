

module.exports = CustomerEntityBuilder = function () {

}

CustomerEntityBuilder.prototype.create = function (req_data) {
    const { customer_id, customer_name, email, mobile_number, address } = req_data;
    return { customer_id, customer_name, email, mobile_number, address };
}

CustomerEntityBuilder.prototype.getCustomers = function (req_data) {
    res_data = [];
    req_data.forEach(data => {
        const { customer_id, customer_name, email, mobile_number, address } = data;
        res_data.push({ customer_id, customer_name, email, mobile_number, address });
    });
    return res_data;
}