const Joi = require('joi')

const registerSchema=Joi.object({
    name: Joi.string().min(3).max(50),

    age:Joi.number().min(8).max(50),
    
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),

    gender:Joi.string().valid("M", "F"),
    
    password:Joi.string().min(8).max(15).required(),
})

const loginSchema =Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string(). min(8).required()

})

module.exports={
    registerSchema,
    loginSchema
}

