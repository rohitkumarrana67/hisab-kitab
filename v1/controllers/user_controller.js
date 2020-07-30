const { createValidator, loginValidator } = require("../validators/user_validators");
const errorBuilder = require("../entity_builders/error_builder");
const Service = require("../services/user_service");
const Builder = require("../entity_builders/user_builder");

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
    },
    logout: async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            });

            await req.user.save();
            res.send();
        } catch (e) {
            res.status(500).send(e);
        }

    },
    getProfile: (req, res) => {
        const UserBuilder = new Builder();
        const res_data = UserBuilder.userProfile(req.user);
        res.status(201).send(res_data);
    }
}