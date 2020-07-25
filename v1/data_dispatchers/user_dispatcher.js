const User = require("../../db/models/users");
var uuid = require('uuid-random');
const bcrypt = require("bcryptjs");
const { recordNotFoundError, unauthorizedError } = require("../../core/utility_functions");

module.exports = UserDispatcher = function (req_data) {

}

UserDispatcher.prototype.create = async function (req_data) {
    req_data.user_id = uuid();
    const user = new User(req_data);
    const user_data = await user.save();
    const token = await user.generateAuthToken();
    return { user, token };
}

UserDispatcher.prototype.login = async function (req_data) {
    const user = await User.findByCredentials(req_data.email, req_data.password);
    const token = await user.generateAuthToken();
    return { user, token };
}