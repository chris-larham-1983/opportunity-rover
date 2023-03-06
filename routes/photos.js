//express router
const router = require('express').Router();
//database configuration
const pool = require('../db');

//get the first photo for the specified sol
router.get('/:sol/getFirstPhoto', async (req, res) => {
   const { sol } = req.params;
   try {
       //get the first photo for the specified sol
       const firstPhoto = await pool.query('SELECT * FROM photos WHERE sol = $1 ORDER BY id LIMIT 1', [sol]);
       //return the first photo
       return res.status(200).json(firstPhoto.rows);
   } catch(err) {
       return res.status(500).json(`${err.message}`);
   }
});

//get all photos for the specified sol
router.get('/:sol/getAllPhotos', async (req, res) => {
    const { sol } = req.params;
    try {
        //get all photos for the specified sol, returned in the order initially presented by the NASA Mars Rover API
        const allPhotos = await pool.query('SELECT * FROM photos WHERE sol = $1 ORDER BY id', [sol]);
        //return all the photos
        return res.status(200).json(allPhotos.rows);
    } catch(err) {
        return res.status(500).json(`${err.message}`);
    }
});

//get all photos for the specified sol, filtered by the chosen cameras
router.get('/:sol/filterByCameras/:cameras', async (req, res) => {
    const { sol } = req.params;
    //a 'cameras' string is included in the route (:cameras) like this: Front_Hazard_Avoidance_Camera*Rear_Hazard_Avoidance_Camera*Entry,_Descent,_and_Landing_Camera
    let { cameras } = req.params;
    //the string is split on the asterisk...
    cameras = cameras.split("*");
    //the resultant elements have their underscores replaced with spaces...
    for(let index = 0; index < cameras.length; index++) {
        cameras[index] = cameras[index].replace(/_/g, " ");
    };
    //and then the array is joined into a string, using a comma to delimit the elements
    cameras.join(",");
    try {
        //get all photos for the specified sol, filtered by the chosen cameras
        const allPhotos = await pool.query('SELECT * FROM photos WHERE sol = $1 AND camera = ANY($2)', [sol, cameras]);
        //return all the photos
        return res.status(200).json(allPhotos.rows);
    } catch(err) {
        return res.status(500).json(`${err.message}`);
    }
});

router.get('/getRandomPhoto', async (req, res) => {
    //select a random photo between 1 and 8770
    const randomPhoto = Math.floor(Math.random() * 8770) + 1;
    try {
        //get the url and alt associated with the random photo
        const getRandomPhoto = await pool.query('SELECT url, alt FROM photos WHERE id = $1', [randomPhoto]);
        //return the url and alt
        return res.status(200).json(getRandomPhoto.rows);
    } catch(err) {
        //return the error message on error
        return res.status(500).json(`${err.message}`);
    }
});

//add photo details to the photos table
router.post('/addToPhotos', async (req, res) => {
    const { sol, earth_date, camera, url, alt, figcaption } = req.body;
    try {
        //add details to photos
        const addToPhotos = await pool.query('INSERT INTO photos (sol, earth_date, camera, url, alt, figcaption) VALUES ($1, $2, $3, $4, $5, $6)',
            [sol, earth_date, camera, url, alt, figcaption]);
        //return a success message
        return res.status(200).json(`Success!`);
    } catch(err) {
        //return error message
        return res.status(500).json(`${err.message}`);
    }
});

//export the router
module.exports = router;