const { validationResult } = require("express-validator");
const captainModel = require("../models/CaptainModel");
const captionService = require("../services/caption.service");
const BlacklisttokenModel = require("../models/Blacklisttoken.model");


module.exports.registerCaption = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {fullname,email,password,vehicle} = req.body;
    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if(isCaptainAlreadyExist){
        return res.status(400).json({errors:[{msg:"Captain already exist"}]});
    }
    const hashedPassword = await captainModel.hashPassword(password);
    const caption = await captionService.createCaption({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });

    const token = caption.generateAuthToken();
    res.status(201).json({token,caption});
}


module.exports.logincaptain = async (req,res,next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;
    const captain = await captainModel.findOne({email}).select("+password");
    if(!captain){
        return res.status(400).json({errors:[{msg:"Invalid Credentials"}]});
    }

    const isPasswordMatch = await captain.comparePassword(password,captain.password);
    if(!isPasswordMatch){
        return res.status(400).json({errors:[{msg:"Invalid Credentials"}]});
    }
    const token = captain.generateAuthToken();
    res.cookie("token",token);
    res.status(200).json({token,captain});



}

module.exports.getCaptainProfile = async (req,res,next) => {
    res.status(200).json({captain:req.captain});
}

module.exports.logoutCaptain = async (req,res,next) => {
    const token = req.cookies.token || req.header.authorization?.split(' ')[ 1 ];
    await BlacklisttokenModel.create({token});
    
    res.clearCookie("token");
    res.status(200).json({msg:"Logout Successfully"});
}