const jwt = require("jsonwebtoken")
const { User } = require("../models/userModel")
const verifyJWT = (req, res, next) => {
    const { authorization } = req.headers
    
    if(!authorization) {
        return res.sendStatus(401);
    }

    const token = authorization.split(" ")[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, decoded) => {
        if(err) return res.sendStatus(403);
        const {_id} = decoded
        req.user = await User.findOne({_id}).select("_id");
        next()
    })
    
    // try {

    //     const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    //         if(err) return res.sendStatus(403);
    //     })
    //     req.user = await User.findOne({_id}).select("_id");
    //     console.log("user",req.user);
    //     next();
        
    // } catch (error) {
    //     console.log(error);
    //     res.sendStatus(401);
    // }
}

module.exports = {
    verifyJWT
}

