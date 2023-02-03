//express router
const router = require('express').Router();
//database configuration
const pool = require('../db');

//return the sol, earth_date, total_photos, and cameras for each sol on which the Opportunity Rover took photos
router.get('/getManifestDetails', async (req, res) => {
    try {
        const manifestDetails = await pool.query('SELECT sol, earth_date, total_photos, cameras FROM manifest ORDER BY id');
        return res.status(200).json(manifestDetails.rows);
    } catch(err) {
        //return an error message if an error occurred
        return res.status(500).json(`${err.message}`);
    }
});

//add manifest details to the Manifest table
router.post('/addToManifest', async (req, res, next) => {
    const { sol, earth_date, total_photos, cameras } = req.body;
    try {
        //add details to manifest
        const addToManifest = await pool.query('INSERT INTO manifest (sol, earth_date, total_photos, cameras) VALUES ($1, $2, $3, $4)',
            [sol, earth_date, total_photos, cameras]);
        //return a success message
        return res.status(200).json(`Sol statistics added successfully.`);
    } catch(err) {
        //log error
        console.error(err.message);
        return res.status(500).json(`${err.message}`);
    }
});

//export the router
module.exports = router;