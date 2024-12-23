const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports.authUser = async (req,res,next) => {
    try{
        const token = req.cookies.token || req.header.authorization?.split(' ')[ 1 ];
        if(!token){
            return res.status(401).json({errors:[{msg:"Unauthorized Access"}]});
        }
        const isBlackListed = await userModel.findOne({token:token});

        if(isBlackListed){
            return res.status(401).json({errors:[{msg:"Unauthorized Access"}]});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();
    }catch(error){
        return res.status(401).json({errors:[{msg:"Unauthorized Access"}]});
    }
}
