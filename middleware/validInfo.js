module.exports = (req, res, next) => {
    //destructure req.body into individual variables
    const { email, first_name, password } = req.body;
    //function to determine an email's validity
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    //register path: if email, first_name, and password do not equate to a Boolean value OR the email is invalid, return an informative error message
    //login path: if email and password do not both equate to a Boolean value OR the email is invalid, return an informative error message
    if(req.path === '/register') {
        if(![email, first_name, password].every(Boolean)) {
            return res.status(401).json("Missing credentials.");
        } else if(!validEmail(email)) {
            return res.status(401).json("Invalid email.");
        }
    } else if(req.path === '/login') {
        if(![email, password].every(Boolean)) {
            return res.status(401).json("Missing credentials.");
        } else if(!validEmail(email)) {
            return res.status(401).json("Invalid email.");
        }
    }
    //continue to the next function if input is valid
    next();
};