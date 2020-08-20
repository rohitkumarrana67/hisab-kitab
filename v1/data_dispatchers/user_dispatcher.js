const User = require("../../db/models/users");
const Customer = require("../../db/models/customer");
const Transaction = require("../../db/models/transactions");
var uuid = require('uuid-random');
const bcrypt = require("bcryptjs");
const { recordNotFoundError, unprocessableEntityError } = require("../../core/utility_functions");

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
    const user = await User.findOneAndUpdate({ user_id }, { $set: this.req_data }, { new: true });
    return user;
}

UserDispatcher.prototype.updatePassword = async function () {
    const user_id = this.user_info.user_id
    const user = await User.findOne({ user_id });
    const isMatch = await bcrypt.compare(this.req_data.current_password, user.password);
    if (!isMatch) {
        throw unprocessableEntityError("current password not matched!");
    }
    user.password = this.req_data.new_password
    return await user.save();
}

UserDispatcher.prototype.deleteUser = async function () {
    const id = this.req_data.params.user_id;
    if(id === this.user_info.user_id){
        await User.deleteMany({user_id : id});
        await Customer.deleteMany({user_id : id});
        await Transaction.deleteMany({user_id : id});
        return true;
    }
    throw unprocessableEntityError("Cannot delete records of any other user.");
}
