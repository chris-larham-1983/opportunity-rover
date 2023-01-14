//express router setup
const router = require('express').Router();
//database configuration
const pool = require('../db');
//authorization middleware
const authorization = require('../middleware/authorization');

//read a specific customer's shopping cart
router.get('/:customer_id', async (req, res, next) => {
    //define customer_id
    const { customer_id } = req.params;
    try {
        //obtain customer's cart items, ordered by the time of their addition to cart
        const allCartItems = await pool.query('SELECT * FROM Cart WHERE customer_id = $1 ORDER BY added_to_cart DESC', [customer_id]);
        //return either a 'cart empty' message or the cart items
        if(allCartItems.rows.length === 0) {
            return res.status(200).json('Your cart is empty.');
        }
        return res.status(200).json(allCartItems.rows);
    } catch(err) {
        //forward the error to the error-handling middleware
        return next(err);
    }
});

//obtain a customer's id
router.get('/details/customer_id', authorization, async (req, res, next) => {
    try {
        //obtain customer's id
        const customer_id = await pool.query('SELECT id FROM Customers WHERE user_id = $1', [req.user]);
        //return customer's id
        return res.status(200).json(customer_id.rows[0]['id']);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//obtain a customer's username
router.get('/details/customer_name', async (req, res, next) => {
    //define customer_id
    const customer_id = req.header("customer_id");
    try {
        //retrieve customer username from database
        const customerName = await pool.query('SELECT username FROM Customers WHERE id = $1', [customer_id]);
        //return customer's username
        return res.status(200).json(customerName.rows[0]['username']);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//get the customer's email address
router.get('/details/email', async (req, res, next) => {
    //define customer_id
    const customer_id = req.header("customer_id");
    try {
        //get the customer's email address
        const emailAddress = await pool.query('SELECT email FROM Customers WHERE id = $1', [customer_id]);
        //return the email address
        return res.status(200).json(emailAddress.rows[0]['email']);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//add a product to the current customer's shopping cart
router.post('/:customer_id', async (req, res, next) => {
    //define customer_id
    const { customer_id } = req.params;
    //define product_id and product_quantity
    const { product_id, product_quantity } = req.body;
    try {
        //add items to cart
        const addedToCart = await pool.query('INSERT INTO Cart (product_id, product_name, product_description, product_image_url, product_price, product_quantity, cumulative_product_price, customer_id, added_to_cart) ' +
            'VALUES ($1, (SELECT item_name FROM Products WHERE id = $1), (SELECT item_description FROM Products WHERE id = $1), (SELECT image_url FROM Products WHERE id = $1), (SELECT price FROM Products WHERE id = $1), $2, ((SELECT price FROM products WHERE id = $1) * $2), $3, (SELECT CURRENT_TIMESTAMP))',
            [product_id, product_quantity, customer_id]);
        //update the cart total
        const updatedCartTotal = await pool.query('WITH updated_cart_total AS (SELECT SUM(cumulative_product_price) AS new_cart_total FROM Cart WHERE customer_id = $1)' +
            'UPDATE Cart SET cart_total = updated_cart_total.new_cart_total FROM updated_cart_total WHERE customer_id = $1',
            [customer_id]);
        //return the number of items added to the cart, so that the cart display can be updated
        return res.status(200).json(`${product_quantity}`);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//update the quantity of a particular item in the current customer's shopping cart, as well as the cumulative_product_price and cart_total fields
router.put('/:customer_id', async (req, res, next) => {
    //define customer_id
    const {customer_id} = req.params;
    //define product_id, product_quantity, and added_to_cart
    const { product_id, product_quantity, added_to_cart } = req.body;
    try {
        //update the number of items in the customer's cart
        const updatedQuantity = await pool.query('UPDATE Cart SET product_quantity = $1, cumulative_product_price = ($1 * (SELECT price FROM Products WHERE id = $2)) WHERE product_id = $2 AND customer_id = $3 AND added_to_cart >= $4 AND added_to_cart <= (SELECT $4 + interval \'1 second\') RETURNING product_quantity, cumulative_product_price, product_id',
            [product_quantity, product_id, customer_id, added_to_cart]);
    } catch(err) {
        //forward error to the error-handling middleware
        return next(err);
    }
    try {
        //update the customer's cart total price
        const updatedCartTotal = await pool.query('WITH updated_cart_total AS (SELECT SUM(cumulative_product_price) AS new_cart_total FROM Cart WHERE customer_id = $1) UPDATE Cart SET cart_total = updated_cart_total.new_cart_total FROM ' +
            'updated_cart_total WHERE customer_id = $1',
            [customer_id]);
        //return an update success message
        return res.status(200).json(`Update success!`);
    } catch(err) {
        //forward error to the error-handling middleware
        return next(err);
    }
});

//delete an item from the current customer's shopping cart, and update the cart total:
router.delete('/:customer_id/:product_id', async (req, res, next) => {
    try {
        //define the customer_id and product_id
        const { customer_id, product_id } = req.params;
        //define added_to_cart
        const added_to_cart = req.header("added_to_cart");
        //delete the specified item
        const deleteItem = await pool.query('DELETE FROM Cart WHERE customer_id = $1 AND product_id = $2 AND added_to_cart >= $3 AND added_to_cart <= (SELECT $3 + interval \'1 second\')',
            [customer_id, product_id, added_to_cart]);
        //update the cart total
        const updatedCartTotal = await pool.query('WITH updated_cart_total AS (SELECT SUM(cumulative_product_price) AS new_cart_total FROM Cart WHERE customer_id = $1) ' +
            'UPDATE Cart SET cart_total = updated_cart_total.new_cart_total FROM updated_cart_total WHERE customer_id = $1',
            [customer_id]);
        //return a deletion success message
        return res.status(200).json(`Deletion success!`);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//when the customer has completed their transaction...
router.get('/:customer_id/checkoutCompleteMessage', async (req, res, next) => {
    try {
        //define customer_id
        const { customer_id } = req.params;
        //define all the items currently still in the customer's cart
        const selectCartItems = await pool.query('SELECT * FROM Cart WHERE customer_id = $1', [customer_id]);
        //if the customer navigates to the /success route without having made a purchase, return a success message (and display their last order details on the front-end)
        if(selectCartItems.rows.length === 0) {
            return res.status(200).json('Your cart is empty so there is nothing to process!');
        }
        //create an array of cart details
        let cartDetails = [];
        //fill array with product-describing objects
        for(let index = 0, length = selectCartItems.rows.length; index < length; index++) {
            cartDetails[index] = {};
            for(let property in selectCartItems.rows[index]) {
                cartDetails[index][property] = selectCartItems.rows[index][property];
            }
        }
        //update the customer's order history
        const updateOrderHistory = await pool.query('INSERT INTO Orders (cart, date_of_purchase, customer_id) ' +
            'VALUES ($1, (SELECT CURRENT_TIMESTAMP(2)), $2) RETURNING id',
            [cartDetails, customer_id]);
        //define the order number
        const orderNumber = updateOrderHistory.rows[0].id;
        //delete the items from the customer's cart
        const clearCart = await pool.query('DELETE FROM Cart WHERE customer_id = $1', [customer_id]);
        //return a checkout complete message
        return res.status(200).json(`This transaction has been added to your order history and your cart has been cleared.  A confirmation email will be sent to your email address shortly.  For your reference, your order number is ${orderNumber}.  We hope you enjoy your purchase!`);
    } catch(err) {
        //forward error to the error-handling middleware
        return next(err);
    }
});

//export the router
module.exports = router;