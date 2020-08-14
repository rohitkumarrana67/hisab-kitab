const User = require("../../db/models/users");
var uuid = require('uuid-random');
const bcrypt = require("bcryptjs");
const { recordNotFoundError, unauthorizedError } = require("../../core/utility_functions");

module.exports = UserDispatcher = function (req_data, user_info) {
    this.req_data = req_data
    this.user_info = user_info
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

UserDispatcher.prototype.update = async function () {
    const user_id = this.user_info.user_id
    const user = await User.findOneAndUpdate({user_id},{$set : this.req_data},{new: true});
    return user;
}
