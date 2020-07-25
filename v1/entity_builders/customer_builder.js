

module.exports = CustomerEntityBuilder = function () {

}

CustomerEntityBuilder.prototype.create = function (req_data) {
    const { customer_name, email, mobile_number, address } = req_data;
    return { customer_name, email, mobile_number, address };
}