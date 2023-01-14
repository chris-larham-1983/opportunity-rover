//express router setup
const router = require("express").Router();
//database configuration
const pool = require('../db');

//get all wishlist items
router.get('/', async (req, res, next) => {
    //define user_name
    const user_name = req.header("user_name");
    try {
        //return the customer's wishlist, sorted such that the most recently added/created items are returned first
        const wishlist = await pool.query('SELECT * FROM wishlist WHERE user_name = $1 ORDER BY created_or_modified DESC', [user_name]);
        //return the array of wishlist items
        res.status(200).json(wishlist.rows);
    } catch (err) {
        //pass error on to error-handling middleware
        return next(err);
    }
});

//get a wishlist item
router.get('/:id', async (req, res, next) => {
    try {
        //destructure req.params to obtain the wishlist id
        const { id } = req.params;
        //get the specified wishlist item's details
        const wishlistItem = await pool.query('SELECT * FROM wishlist WHERE wishlist_id = $1', [id]);
        //return the specified wishlist item's details
        res.json(wishlistItem.rows[0]);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//create a wishlist item
router.post('/', async (req, res, next) => {
    try {
        //define description
        const { description } = req.body;
        //define user_name
        const user_name = req.header("user_name");
        //add wishlist item to database
        const createWishlistItem = await pool.query('INSERT INTO wishlist (description, user_name) VALUES ($1, $2) RETURNING *', [description, user_name]);
        //return a success message
        res.status(201).json('Wishlist item was added.');
    } catch(err) {
        //pass error on to error-handling middleware defined in 'index.js'
        return next(err);
    }
});

//update a wishlist item
router.put('/:id', async (req, res, next) => {
    try {
        //define the wishlist id
        const { id } = req.params;
        //define the wishlist description
        const { description } = req.body;
        //update the wishlist
        const updateWishlist = await pool.query('UPDATE wishlist SET description = $1, created_or_modified=(SELECT CURRENT_TIMESTAMP) WHERE wishlist_id = $2 RETURNING description', [description, id]);
        //return the updated wishlist item
        res.json(updateWishlist.rows);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//delete a wishlist item
router.delete('/:id', async (req, res, next) => {
    try {
        //define the id
        const { id } = req.params;
        //delete the specified item
        const deleteWishlistItem = await pool.query('DELETE FROM wishlist WHERE wishlist_id = $1', [id]);
        //return a DELETE success status and message
        res.status(200).json('Wishlist item was deleted.');
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//export the router
module.exports = router;