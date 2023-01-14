//json web token configuration
const jwt = require("jsonwebtoken");
//facilitate access to .env variables
require('dotenv').config();

module.exports = async(req, res, next) => {
    try {
        //try to access the 'token' request header
        const jwtToken = req.header("token");
        //return false if no valid json web token is present
        if(jwtToken === null) {
            return res.status(403).json(false);
        }
        //verify the json web token, with reference to the process.env.jwtSecret variable
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        //add the 'user' property of payload to req
        req.user = payload.user;
        //call the next function in the chain
        next();
    } catch(err) {
        //in the case of an error, return false
        return res.status(403).json(false);
    }
};