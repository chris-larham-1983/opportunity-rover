//express setup
const router = require("express").Router();
//database configuration
const pool = require("../db");
//authorization middleware
const authorization = require('../middleware/authorization');

//function to get an authorized customer name
router.get('/', authorization, async (req, res) => {
    try {
        //try to obtain username based on [req.user]
        const user = await pool.query("SELECT username FROM Customers WHERE user_id = $1", [req.user]);
        res.json(user.rows[0]);
     } catch(err) {
        //send an error message if an error occurs
        res.status(500).json("An error occurred while trying to get your username.");
     }
});

//export the router
module.exports = router;