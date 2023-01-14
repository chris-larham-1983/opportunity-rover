//json web token configuration
const jwt = require("jsonwebtoken");
//facilitate access to .env variables
require('dotenv').config();

//pass in the customer's uuid
function jwtGenerator(user_id) {
    //generate a payload object consisting of the customer's uuid 'user_id', stored in a 'user' property
    const payload = {
        user: user_id
    }
    //return the payload signed with the 'jwtSecret' defined in the 'process.env.jwtSecret' variable, set to expire in one day
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: 60 * 60 * 24 });
}
//export the 'jwtGenerator'
module.exports = jwtGenerator;

