//express router
const router = require('express').Router();
//database configuration
const pool = require('../db');

//return the sol, earth_date, total_photos, cameras, first_photo_url, and first_photo_alt for each sol on which the Opportunity Rover took photos
router.get('/getManifestDetails', async (req, res) => {
    try {
        const manifestDetails = await pool.query('SELECT sol, earth_date, total_photos, cameras, first_photo_url, first_photo_alt FROM manifest ORDER BY id');
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
        return res.status(500).json(`${err.message}`);
    }
});

//add first photo details for every sol to the manifest table
router.post('/addFirstPhotoDetails', async(req, res) => {
    const { firstPhotoUrl, firstPhotoAlt, sol } = req.body;

    try {
        const updateManifest = await pool.query('UPDATE manifest SET first_photo_url = $1, first_photo_alt = $2 WHERE sol = $3', [firstPhotoUrl, firstPhotoAlt, sol]);
        return res.status(200).json(`SUCCESS!`);
    } catch(err) {
        return res.status(500).json(`${err.message}`);
    }
});

//export the router
module.exports = router;