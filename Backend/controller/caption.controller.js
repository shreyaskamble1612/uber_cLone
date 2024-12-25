const { validationResult } = require("express-validator");
const captainModel = require("../models/CaptainModel");
const captionService = require("../services/caption.service");


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