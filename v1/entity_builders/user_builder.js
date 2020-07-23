
module.exports = UserEntityBuilder = function (req_data) {

}

UserEntityBuilder.prototype.create = function (req_data) {
    const {name,email,password} = req_data;
    return {name,email,password};
}

