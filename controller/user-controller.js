const {registerSchema, loginSchema} = require('../helper/validators')
const Userservice = require('../services/user-service')


const registration= async(res, req, next)=>{
    const {error} = await registerSchema.validate(req.body)
    if(error){
        console.log(error)
        return res.status(400).json({
           success: false,
           error:error.details[0].message
        })

    }
    await Userservice.register(res, req, next)
}

const login = async(req, res, next)=>{
    const{error}= await loginSchema.validate(req.body)
    if(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            error:error.details[0].message
        })
    }
    await Userservice.signin(req, res, next)
}

module.exports={
registration,
login
}