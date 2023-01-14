//setup express router
const router = require('express').Router();
//configure database
const pool = require('../db');

//get all orders
router.get('/', async (req, res, next) => {
    try {
        //get all orders, ordered by id
        const allOrders = await pool.query('SELECT * FROM Orders ORDER BY id');
        //return array of order objects
        return res.status(200).json(allOrders.rows);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//get all of a specific customer's orders
router.get('/:customer_id', async (req,res, next) => {
    //define customer_id
    const { customer_id } = req.params;
    try {
        //obtain customer's order history, ordered by date of purchase with most recent purchase first
        const customerOrders = await pool.query('SELECT id AS order_id, (SELECT to_char(date_of_purchase, \'Day Mon DD YYYY HH24:MI:SS \') AS string_date_of_purchase), cart FROM Orders ' +
            'WHERE customer_id = $1 ORDER BY date_of_purchase DESC', [customer_id]);
        //return an empty array if the customer has not made any orders
        if(customerOrders.rows.length === 0) {
            return [];
        }
        //return the customer's order history
        res.status(200).json(customerOrders.rows);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//return the id of the last order made by a particular customer
router.get('/:customer_id/last_order', async (req, res, next) => {
    //define customer_id
    const { customer_id } = req.params;
    try {
        //select the greater of (0, max order id for specified customer)
        const lastOrder = await pool.query('SELECT GREATEST(0, (SELECT MAX(id) FROM Orders WHERE customer_id = $1))', [customer_id]);
        //return the value from the above query
        res.status(200).json(lastOrder.rows[0]['greatest']);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//return the details of a specific order for a particular customer
router.get('/:customer_id/:order_id', async (req, res, next) => {
    //define customer_id, order_id
    const { customer_id, order_id } = req.params;
    try {
        //query the database for the specified customer's particular order
        const customerOrder = await pool.query('SELECT id AS order_id, date_of_purchase, cart FROM Orders ' +
            'WHERE id = $1 AND customer_id = $2', [order_id, customer_id]);
        //forward error to error-handling middleware if no such order exists
        if (customerOrder.rows.length === 0) {
            return next(new Error('No association of the specified customer ID and order ID exists in the database.'));
        }
        //return the specified order details
        res.status(200).json(customerOrder.rows);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//export the router
module.exports = router;