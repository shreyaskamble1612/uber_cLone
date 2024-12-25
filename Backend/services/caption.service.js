const captainModel = require('../models/CaptainModel');

module.exports.createCaption = async({
    firstname,lastname,email,password,color,plate,capacity,vehicleType
}) => {
    try{
        if(!firstname || !lastname || !email || !vehicleType || !password || !color || !plate || !capacity){
            throw new Error("All fields are required");
        }

        const caption = captainModel.create({
            fullname:{
                firstname,
                lastname
            },
            email,
            password,
            vehicle:{
                color,
                plate,
                capacity,
                vehicleType
            }
        })
        return caption;
    }catch(error){
        throw new Error(error);
    }
}