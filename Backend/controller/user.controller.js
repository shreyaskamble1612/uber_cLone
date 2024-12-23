const userModel = require("../models/userModel");
const userServices = require("../services/user.services");
const  {validationResult} = require("express-validator");
module.exports.registerUser = async (req,res,next) => {
    try{
        const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname,email,password} = req.body;
    const hashedPassword = await userModel.hashPassword(password);
    
    // create user
    const user = await userServices.createUser({
        firstname:fullname.firstname,lastname:fullname.lastname,email,password:hashedPassword
    })
    //generating token

     const token = user.generateAuthTOken();
     res.status(201).json({token,user})
    }catch(err){
        next(err);
    }

    
}