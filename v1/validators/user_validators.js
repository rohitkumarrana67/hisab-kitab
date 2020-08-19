const Joi = require("joi");

const createValidator = async function (req_data) {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().min(7).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required()
    });
    return await schema.validateAsync(req_data);
};

const loginValidator = async function (req_data) {
    const schema = Joi.object({
        password: Joi.string().min(7).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required()
    });
    return await schema.validateAsync(req_data);
}

const updateValidator = async function (req_data) {
    // console.log(req_data)
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        address: Joi.string().required(),
        mobile_number: Joi.number().integer().required()
    });
    return await schema.validateAsync(req_data);
}

const updatePasswordValidator = async function (req_data) {

    const schema = Joi.object({
        current_password: Joi.string().min(7).required(),
        new_password: Joi.string().min(7).required()
    })
    return await schema.validateAsync(req_data)
}

module.exports = {
    createValidator,
    loginValidator,
    updateValidator,
    updatePasswordValidator
}