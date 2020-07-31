const Joi = require("joi")

const indexRequestValidator = async function (params) {
    const params_schema = Joi.object({
        id : Joi.string().guid({version:"uuidv4"}).required(),
        type : Joi.string().allow("give", "take").required()
    }).options({abortEarly: false})

    return await params_schema.validate(params, {convert:true})
}

const createEntryValidator = async function (params, body) {
    const params_schema = Joi.object({
        id : Joi.string().guid({version:"uuidv4"}).required(),
        type : Joi.string().allow("give", "take").required()
    }).options({abortEarly: false})

    const body_schema = Joi.object({
        amount : Joi.number().required(),
        message : Joi.string().default("")
    }).options({abortEarly: false})

    return await Promise.all([
        params_schema.validate(params, {convert:true}),
        body_schema.validate(body, {convert:true})
    ])
}

module.exports = {
    indexRequestValidator,
    createEntryValidator
}