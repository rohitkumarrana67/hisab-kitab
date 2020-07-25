const Joi = require("@hapi/joi");
const { number } = require("@hapi/joi");

const customerCreateValidator = async (req_data) => {

    const schema = Joi.object({
        customer_name: Joi.string().required(),
        mobile_number: Joi.array().items(Joi.number()),
        address: Joi.string(),
        email: Joi.string().email({ tlds: { allow: false } })
    });
    return await schema.validateAsync(req_data)
}


module.exports = {
    customerCreateValidator
}