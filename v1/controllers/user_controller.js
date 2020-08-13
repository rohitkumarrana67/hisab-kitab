const { createValidator, loginValidator , updateValidator ,passwordValidator} = require("../validators/user_validators");
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
                return token !== req.token;
            });

            await req.user.save();
            res.status(200).send({ success: "successfully logout" });
        } catch (error) {
            errorBuilder(error).then((error) => {
                res.status(error.code).send(error.body)
            })
        }

    },

    getProfile: (req, res) => {
        const UserBuilder = new Builder();
        const res_data = UserBuilder.userProfile(req.user);
        res.status(201).send(res_data);
    },

    setAvatar: (req, res) => {
        req.user.avatar = req.file.buffer;
        req.user.save().then(data => {
            res.status(201).send({ success: true, message: "Avatar added succesfully!" });
        }).catch(error => {
            errorBuilder(error).then((error) => {
                res.status(error.code).send(error.body)
            });
        });
    },

    update: async (req,res) => {
        var data = await updateValidator(req.body)
        const UserService = new Service(data, req.user)
        UserService.update().then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    },

    changePassword : async (req,res) =>{
        var data = await passwordValidator(req.body)
        const UserService = new Service(req.body,req.user)
        UserService.changePassword()
    }
}