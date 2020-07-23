const User = require("../../db/models/users");

module.exports = UserDispatcher = function (req_data) {

}

UserDispatcher.prototype.create = async function (req_data) {
    const user = new User(req_data);
    console.log(user)
    return await user.save()
}