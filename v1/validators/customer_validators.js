const Joi = require("joi");

const customerCreateValidator = async (req_data) => {
    const schema = Joi.object({
        customer_name: Joi.string().required(),
        mobile_number: Joi.number(),
        address: Joi.string(),
        email: Joi.string().email({ tlds: { allow: false } })
    });
    return await schema.validateAsync(req_data)
}

const getCustomerByIdValidator=async(req_data)=>{
    const req_obj={customer_id:req_data.id}
    const schema=Joi.object({
        customer_id : Joi.string().guid({version:"uuidv4"}).required()
    })
    return await schema.validateAsync(req_obj);
}

const updateCustomerByIdValidator = async function (params, body){
    const params_schema = Joi.object({
        id : Joi.string().guid({version:"uuidv4"}).required(),
    }).options({abortEarly: false, allowUnknown:false})

    const body_schema = Joi.object({
        mobile_number : Joi.number().integer(),
        customer_name : Joi.string(),
        address: Joi.string(),
        email: Joi.string().email({ tlds: { allow: false } })
    }).options({abortEarly: false, allowUnknown:false})

    return await Promise.all([
        params_schema.validateAsync(params, {convert:true}),
        body_schema.validateAsync(body, {convert:true})
    ])
}

module.exports = {
    customerCreateValidator,
    getCustomerByIdValidator,
    updateCustomerByIdValidator
}