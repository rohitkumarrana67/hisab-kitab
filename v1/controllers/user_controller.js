const { createValidator } = require("../validators/user_validators");

module.exports = {

    create: (req, res) => {
        res.send("hello");
        createValidator(req.body).then(data => {

        }).then(data => {

        }).catch(error => {
            errorBuilder(error).then((error) => {
                res.status(error.code).send(error.body)
            })
        })

    }
}