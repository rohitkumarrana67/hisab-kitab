const { createValidator, loginValidator } = require("../validators/user_validators");
const errorBuilder = require("../entity_builders/error_builder");
const Service = require("../services/user_service");

module.exports = {

    createNewUser: (req, res) => {
        createValidator(req.body).then(data => {
            const UserService = new Service(data);
            return UserService.create(data);
        }).then(data => {
            res.status(201).send(data);
        }).catch(error => {
            errorBuilder(error).then((error) => {
                res.status(error.code).send(error.body)
            })
        })
    },

    login: (req, res) => {
        loginValidator(req.body).then(data => {
            const UserService = new Service(data);
            return UserService.login(data);
        }).then(data => {
            res.status(201).send(data);
        }).catch(error => {
            errorBuilder(error).then((error) => {
                res.status(error.code).send(error.body)
            })
        })
    }
}