const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');


module.exports.getCordinates = async (req, res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()[0].msg});
    }
    const  {address} = req.query;
    try{
        const coordinates = await mapsService.getAddressCoordinates(address);
        res.status(200).json(coordinates);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

module.exports.getDistanceTime = async (req, res,next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()[0].msg});
        }
        const {origin,destination} = req.query;

        const distanceTIme = await mapsService.getDistanceTime(orirign,destination)
        res.status(200).json(distanceTIme);
    }catch(err){
        console.log(err);
        res.status(500).json({message:'Internal Server Error'});
    }
}
module.exports.getAutoCompleteSuggestions = async (req, res,next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()[0].msg});
        }
        const {input} = req.query;
        const suggestions = await mapsService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    }catch(err){
        console.log(err);
        res.status(500).json({message:'Internal Server Error'});
    }
}