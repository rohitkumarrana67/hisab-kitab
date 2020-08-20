
module.exports = UserEntityBuilder = function (req_data) {

}

UserEntityBuilder.prototype.create = function (req_data) {
    const { name, email, password } = req_data.user;
    const user = { name, email, password };
    return { user, token: req_data.token };
}

UserEntityBuilder.prototype.login = function (req_data) {
    const { name, email, password } = req_data.user;
    const user = { name, email, password };
    return { user, token: req_data.token };
}


UserEntityBuilder.prototype.userProfile = function (req_data) {
    // console.log(req_data)
    const { name, email, address, mobile_number, avatar } = req_data;
    return { name, email, address, mobile_number, avatar };
}

UserEntityBuilder.prototype.updatePassword = function (req_data) {
    return {
        success: true,
        message: "password successfully updated"
    }
}