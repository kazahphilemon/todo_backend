
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()
const updateUser = async(req, res, next)=>{
    try{
        // const {name} = req.params;
        const { id } = req.params;
        if(id.length >24 || id.length <24)
        return res.status(400).json({
            message: 'invaild',
            success: false
        })

        const user = await User.findByIdAndUpdate( id, req.body, { new: true});
        
        
        if (!user)
    return res.status(400).json({
        message: 'invaild',
        success: false
        
    });
    return res.status(200).json({
        success: true,
        user: user,
        message:"user fetch succesfully"
    })

    }catch (err){
        console.log(err.message)
    }
}


const deleteUser = async(req, res, next)=>{
    try{
        const { id } = req.params;
        // const { name } = req.params;
        // if (name!==name)
        if(id.length >24 || id.length <24)
        return res.status(400).json({
            message: 'invaild Id',
            success: false
        })

        const user = await userlist.findByIdAndDelete(id);

        if (!user)
    return res.status(400).json({
        message: 'invaild',
        success: false
        
    });
    return res.status(200).json({
        success: true,
        user: user,
        message:"user fetch succesfully"
    })

    }catch (err){
        console.log(err.message)
    }
}

const getAllUser = async(req, res, next)=>{
    try{
        // const { limit } = req.params;
        // const { page } = req.params;
        const {id} = req.params;
        // console.log(id);
        if(id.length >24 || id.length <24)
        return res.status(400).json({
            message:'invalid',
            success: false 
        })
        
        const user = await User.findById(id);
    
    if (!user)
    return res.status(400).json({
        message: 'null',
        success: false
        
    });
    return res.status(200).json({
        success: true,
        user: user,
        message:"user fetch succesfully"
    });

    } catch (err){
        console.log(err.message)
    }
}


const getUser = async (req, res, next)=>{
    try{
        const { limit } = req.params;
        const { page } = req.params;
    
        const usePage = page - 1;
       
        const user = await User.find()
        .skip( usePage * limit)
        .limit(limit)
      
    
    if (!user)
    return res.status(400).json({
        message: 'invaild',
        success: false
        
    });
    return res.status(200).json({
        success: true,
        user: user,
        message:"user fetch succesfully"
    });

    } catch (err){
        console.log(err.message)
    }
}
const singleUser = async(req, res, next)=>{
    res.json(req.user)
}

const register = async (req, res, next) =>{
    try{
        const {name, age, email, gender, password, confirm_password}= req.body
       

    // check if any of the mention field is empty    
        if(!name|| !email|| !password || !confirm_password )
        return res.status(400).json({
            message: "all field are compulsory",
            success: false
        })
 //check if user exists by email
        const findUser = await User.findOne({ email})
        if(findUser)
        return res.status(400).json({
            message: 'user with email already exists',
            success: true,
        });
    // since email is a string now with the condition below it will read invaild without the @ symbol
        if (!email.includes("@"))
        return res.status(400).json({
            message:'invalid email'
        })

        if (password !==  confirm_password)
        return res.status(400).json({
            message: "password is different from confirm_password"
        })
     
        //  const usePassword = await jwt.sign({password}, process.env.JWT_SECRET, {algorithm: 'HS256'})
        //  console.log("UsePassword: ", usePassword)

        //encrypting a password even in the database Db
        const hashedPassword = await bcrypt.hash(password, 10)
        // console.log("hashpassword: ", hashedPassword )
        
        // creating a new user
        const user = new User({
            name: name,
            age: age,
            email: email,
            gender: gender,
            password: hashedPassword,
            confirm_password: hashedPassword
        })
        await user.save();

    // token which include the header, secret and option which may be our expiretime
       const Access_token = await jwt.sign(
        {id: user._id, name: user.name, age: user.age, email: user.email, gender: user.gender}, 
        process.env.JWT_SECRET, 
        {
            expiresIn: 5 * 60 * 60
        })

    // to make our token appear with the info of the user when successfully sign in
        user.token = Access_token
    // instead of seeing the hash password you will just see hidden
        user.password = "hidden"
        user.confirm_password="hidden"
    //cookies
        res.cookie("jwt", Access_token, {httpOnly: true, maxAge: 5 * 60 * 60 * 1000 })

        if(!user)
        return res.status(500).json({
            status: false,
            message: "something went wrong"
        })
        
        return res.status(201).json({
            success: true,
            message: "user created successfully",
            user: user,
        })
    }
    catch (error){
        console.log(error)
    }

};
    
const signin= async(req, res)=>{
    try{
        //fetch the field we want from the body
        const{email,password}=req.body
       
    //finding the an email from the database Db
        const findUser = await User.findOne({email})

    // check if the email if it is correct than before checking the password
    if(!(findUser && (await bcrypt.compare(password, findUser.password)))){
        res.status(400).json({
            success: false,
            message: "email or password is incorrect"
        })
              
    }
    //token
    const token = await jwt.sign(
        {id: findUser.id, name: findUser.name, age: findUser.age, email: findUser.email, gender: findUser.gender}, 
        process.env.JWT_SECRET, 
        {
            expiresIn: 5 * 60 * 60
        })

        findUser.token = token
        findUser.password = "hidden"

    // cookie
        res.cookie("jwt", token, {httpOnly: true, maxAge: 5 * 60 * 60 * 1000})
        return res.status(201).json({
            success: true,
            user: [{"token": findUser.token} ],
            message: "login successfully"
        })     
  
   
    
    
    
    }
    catch (err){
        console.log(err)
    }

}





module.exports = {
    register,
    getUser,
    getAllUser,
    deleteUser, 
    updateUser,
    signin,
    singleUser,
}
