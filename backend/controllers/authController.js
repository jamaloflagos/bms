require("dotenv").config()
const {User} = require("../models/userModel")
const jwt = require("jsonwebtoken")

const generateAccessToken = (_id) => {
    return jwt.sign({_id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"})
}
const generateRefreshToken = (_id) => {
    return jwt.sign({_id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1d"})
}


// const signupController = async (req, res) => {
//     const {email, password, name} = req.body
//     try {
            // const refreshToken = generateRefreshToken(user._id);
    //         const user = await User.signup(email, password, name, refreshToken)
    //         const token =  generateAccessToken(user._id)
                // res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
//         res.status(201).json({accessToken, name})
//     } catch (error) { 
//         res.status(400).json({error: error.message})
//     }

//     console.log("recieved");
    
// }


const login = async (req, res) => {
    const {email} = req.body
    
    try {
        const user = await User.login(email)

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json({ accessToken })

    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
}

const refreshToken = async(req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    

    if (!cookies && !cookies.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded) => {
            if(err) return res.sendStatus(403)

            const foundUser = User.findOne({
                _id: decoded._id
            })

            if(!foundUser) return refreshToken.sendStatus(401);

            const accessToken = generateAccessToken(foundUser._id)

            res.json({accessToken})
    })
}

const logout = (req, res) => {
    const cookies = req.cookies

    if (!cookies && !cookies.jwt) return res.sendStatus(204);

    res.clearCokkies("jwt", {httpOnly: true, sameSite: "None", secure: true});
    res.json();

}

module.exports = { login, refreshToken, logout }