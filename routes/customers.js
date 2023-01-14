//express router
const router = require('express').Router();
//database configuration
const pool = require('../db');

//read all customers' details
router.get('/', async (req, res, next) => {
    try {
        //get all customers' details, ordered by id
        const allCustomers = await pool.query('SELECT * FROM Customers ORDER BY id');
        //return an array of customer objects
        return res.status(200).json(allCustomers.rows);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//read a specific customer's details
router.get('/:id', async (req, res, next) => {
    //define id
    const { id } = req.params;
    try {
        //get all details relating to a specific customer
        const specificCustomer = await pool.query('SELECT * FROM Customers WHERE id = $1', [id]);
        //forward a custom error to the error-handling middleware if no details are returned from the above query
        if(specificCustomer.rows.length === 0) {
            return next(new Error('Customer does not exist in the database.'));
        }
        //return the customer's details
        return res.status(200).json(specificCustomer.rows);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//update a specific customer's details
router.put('/:id', async (req, res, next) => {
    //define id
    const { id } = req.params;
    //define first_name, last_name, username, and email
    const { first_name, last_name, username, email } = req.body;
    try {
        //update the customer's details
        const updateCustomer = await pool.query('UPDATE customers SET first_name = $1, last_name = $2, username = $3, email = $4 WHERE id = $5 RETURNING first_name',
            [first_name, last_name, username, email, id]);
        //forward a custom error to the error-handling middleware if nothing is returned from the above query
        if(updateCustomer.rows.length === 0) {
            return next(new Error('Customer does not exist in the database.'));
        }
        //return a success message
        return res.status(200).json(`Customer with id ${id} updated successfully.`);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//delete a specific customer's details
router.delete('/:id', async (req, res, next) => {
    //define id
    const { id } = req.params;
    try {
        //delete the customer
        const deleteCustomer = await pool.query('DELETE FROM Customers WHERE id = $1', [id]);
        //return a success message
        return res.status(200).json(`Customer with id ${id} deleted successfully.`);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//export the router
module.exports = router;