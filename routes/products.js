//express router setup
const router = require("express").Router();
//database configuration
const pool = require("../db");

//get all products
router.get("/", async (req, res, next) => {
    try {
        //get all products
        const allProducts = await pool.query('SELECT * FROM Products ORDER BY id');
        //return all products
        res.status(200).json(allProducts.rows);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//get a specific product
router.get("/:id", async (req, res, next) => {
    //define id
    const { id } = req.params;
    try {
        //get details for specified product
        const productDetails = await pool.query("SELECT * FROM Products WHERE id = $1", [id]);
        //invoke the error-handling middleware if no product is found
        if(productDetails.rows.length === 0) {
            return next(new Error('No product with the specified ID found in the database.'));
        }
        //otherwise, return the product details
        res.status(200).json(productDetails.rows[0]);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//create a product
router.post("/", async (req, res, next) => {
    //define item_name, item_description, image_url, and price
    const { item_name, item_description, image_url, price } = req.body;
    try {
        //add product to database
        const creation = await pool.query('INSERT INTO products (item_name, item_description, image_url, price) VALUES ($1, $2, $3, $4)', [item_name, item_description, image_url, price]);
        //send a success message back
        res.status(200).json('Product created successfully.');
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//updates a product
router.put('/:id', async (req, res, next) => {
    //define item_name, item_description, image_url, and price
    const { item_name, item_description, image_url, price } = req.body;
    //define id
    const { id } = req.params;
    try {
        //update product
        const update = await pool.query('UPDATE Products SET item_name = $1, item_description = $2, image_url = $3, price = $4 WHERE id = $5 RETURNING item_name', [item_name, item_description, image_url, price, id]);
        //forward an error to the error-handling middleware in the case where the specified product is not found in the database
        if(update.rows.length === 0) {
            return next(new Error('No product with the specified ID found in the database.'));
        } else {
            //otherwise, send a success message back
            res.status(200).json(`Product with id ${id} modified successfully.`);
        }
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//deletes a product
router.delete('/:id', async (req, res, next) => {
    //define id
    const { id } = req.params;
    try {
        //delete product
        const deletion = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
        //forward error to error-handling middleware if no product with the specified ID was found in the database
        if(deletion.rows.length === 0) {
            return next(new Error('No product with the specified ID found in the database.'));
        } else {
            //otherwise, send a success message back
            res.status(200).json(`Product with id ${id} deleted successfully.`);
        }
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//export router
module.exports = router;