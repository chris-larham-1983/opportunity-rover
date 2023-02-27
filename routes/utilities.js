//Express router
const router = require('express').Router();
//database configuration
const pool = require('../db');

//return the Earth date associated with the given sol
router.get('/solToEarthDate/:sol', async (req, res) => {
    const { sol } = req.params;
    try {
        //get the earth date associated with the specified sol
        const earthDate = await pool.query('SELECT earth_date FROM photos WHERE sol = $1 LIMIT 1', [sol]);
        //return the earth date
        return res.status(200).json(earthDate.rows);
    } catch(err) {
        res.status(500).json(`${err.message}`);
    }
});


//export the router
module.exports = router;