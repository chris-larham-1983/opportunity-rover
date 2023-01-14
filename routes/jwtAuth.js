//express router setup
const router = require("express").Router();
//database configuration
const pool = require('../db.js');
//password encryption
const bcrypt = require('bcrypt');
//json web token generator function
const jwtGenerator = require('../utils/jwtGenerator');
//customer registration input validation
const validInfo = require('../middleware/validInfo');
//json web token verification for the '/auth/is-verified' endpoint
const authorization = require('../middleware/authorization');

//registering
router.post("/register", validInfo, async (req, res) => {
    try {
        //1. destructure req.body
        const { first_name, last_name, username, password, email, street_number, street_name, town, county, country, postcode } = req.body;
        //2. check if email or username is already in use
        const emailTest = await pool.query("SELECT * FROM Customers WHERE email = $1", [email]);
        if(emailTest.rows.length !== 0) {
            return res.status(401).json("email already in use!");
        }
        const usernameTest = await pool.query("SELECT * FROM Customers WHERE username = $1", [username]);
        if(usernameTest.rows.length !== 0) {
            return res.status(401).json("username already in use!");
        }
        //3. bcrypt the user password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password, salt);
        //4. enter user into database
        const newUser = await pool.query("WITH customer_insert AS " +
            "(INSERT INTO Customers (first_name, last_name, username, password, email) " +
            "VALUES ($1, $2, $3, $4, $5) " +
            "RETURNING user_id, id) " +
            "INSERT INTO Addresses (street_number, street_name, town, county, country, postcode, customer_id) " +
            "VALUES ($6, $7, $8, $9, $10, $11, (SELECT id FROM customer_insert)) RETURNING (SELECT user_id FROM customer_insert)",
            [first_name, last_name, username, bcryptPassword, email, street_number, street_name, town, county, country, postcode]);
        //5. generate our jwt token
        //pass the newly-registered customer's user_id into the jwtGenerator function, and generate a json web token signed with process.env.jwtSecret that expires in one day
        const token = jwtGenerator(newUser.rows[0].user_id);
        //return json web token
        res.status(200).json({ token });
    } catch(err) {
        //return an error message if an error occurs
        res.status(500).json(`problem with registration process.`);
    }
});

//login route
router.post("/login", validInfo, async (req, res) => {
    try {
        //1. destructure req.body
        const { email, password } = req.body;
        //2. check if user exists in database
        const user = await pool.query("SELECT * FROM Customers WHERE email = $1", [email]);
        if(user.rows.length === 0) {
            return res.status(401).json("unknown email address.");
        }
        //3. check if incoming password matches database password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if(!validPassword) {
            return res.status(401).json("password is incorrect.");
        }
        //4. give them the jwt token
        //pass the logged-in customer's user_id into the jwtGenerator function, generating a json web token signed with process.env.jwtSecret that expires in one day
        const token = jwtGenerator(user.rows[0].user_id);
        res.status(200).json({ token });
    } catch(err) {
        res.status(500).send("an error occurred during login process.");
    }
});

//endpoint to see whether a user is verified
router.get('/is-verified', authorization, async (req, res) => {
    try {
        //if authorization passes without a hiccup, return true
        res.json(true);
    } catch(err) {
        //if an error occurs, return false
        res.status(500).json(false);
    }
});

//export the router
module.exports = router;