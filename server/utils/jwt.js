const jwt = require("jsonwebtoken");

const generateJWTToken=(userId)=>{
    return jwt.sign({_id:userId},process.env.JWT_SECRET_KEY)
}
