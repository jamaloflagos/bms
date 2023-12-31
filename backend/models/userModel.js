const mongoose = require("mongoose")
// const validator = require("validator")
// const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timeStamps: true,
    // versionKey: false
})


// userSchema.statics.signup = async function(email, password, name, refreshToken) {
//     if(!email || !password || !name) {
//         throw Error("All inputs must be filled")
//     }
    
//     if(!validator.isEmail(email)) {
//         throw Error("Enter a valid email")
//     }

//     if(!validator.isStrongPassword) {
//         throw Error("Enter a strong password")
//     }

//     const userExist = await this.findOne({email})

//     if(userExist) {
//         throw Error("User already exist")
//     }

//     const salt = await bcrypt.genSalt(12)
//     const hash = await bcrypt.hash(password, salt)
//     const user = await this.create({email, password: hash, name, refreshToken})
//     return user
// }


userSchema.statics.login = async function(email)  {
    if(!email) {
        throw Error("Type in a correct email")
    }
    
    const user = await this.findOne({email})

    if(!user) {
        throw Error("User not authenticated")
    }

    // const passwordMatch = await bcrypt.compare(password, user.password)

    // if(!passwordMatch) {
    //     throw Error("Incorrect password")
    // }

    return user
    
}

const User = mongoose.model("user", userSchema)


module.exports = {User}