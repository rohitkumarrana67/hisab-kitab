const UserDispatcher = require("../data_dispatchers/user_dispatcher");
const UserEntityBuilder = require("../entity_builders/user_builder");

module.exports = UserService = function (req_data) {
    this.dispatcher = new UserDispatcher(req_data);
    this.builder = new UserEntityBuilder(req_data);
}

UserService.prototype.create = async function (req_data) {
    const dispatcher_data = await this.dispatcher.create(req_data);
    return this.builder.create(dispatcher_data);
}