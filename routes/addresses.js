//express router setup
const router = require('express').Router();
//database configuration
const pool = require('../db');

//read all customers' addresses
router.get('/', async (req, res, next) => {
    try {
        //get all addresses, ordered by id
        const allAddresses = await pool.query('SELECT * FROM Addresses ORDER BY id');
        //return array of addresses
        return res.status(200).json(allAddresses.rows);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//read a particular customer's address(es)
router.get('/:customer_id', async (req, res, next) => {
    //define customer_id
    const { customer_id } = req.params;
    try {
        //define customer address
        const customerAddress = await pool.query('SELECT * FROM Addresses WHERE customer_id = $1 ORDER BY id', [customer_id]);
        //in the unlikely (theoretically impossible given the constraints placed on the registration inputs, coupled with the addresses table constraints) event
        //that an address is not associated with the customer, forward this error to the error-handling middleware
        if(customerAddress.rows.length === 0) {
            return next(new Error('No address is associated with this customer id.'));
        }
        //return the customer address
        res.status(200).json(customerAddress.rows);
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//create a new address
router.post('/:id', async (req, res, next) => {
    //define id
    const { id } = req.params;
    //define address specifics
    const { street_number, street_name, town, county, country, postcode } = req.body;
    try {
        //add address to database
        const newAddress = await pool.query('INSERT INTO Addresses(street_number, street_name, town, county, country, postcode, customer_id) ' +
            'VALUES($1, $2, $3, $4, $5, $6, $7)',
            [street_number, street_name, town, county, country, postcode, id]);
        //return a success message
        return res.status(200).json('New address created successfully.');
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//update a specific address for a particular customer (a rich customer might have more than one address, so the address_id is required)
router.put('/:customer_id/:address_id', async (req, res, next) => {
    //define customer_id and address_id
    const { customer_id, address_id } = req.params;
    //define street_number, street_name, town, county, country, postcode
    const { street_number, street_name, town, county, country, postcode } = req.body;
    try {
        //update address
        const updateAddress = await pool.query('UPDATE Addresses ' +
            'SET street_number = $1, street_name = $2, town = $3, county = $4, country = $5, postcode = $6 ' +
            'WHERE customer_id = $7 AND id = $8 RETURNING id',
            [street_number, street_name, town, county, country, postcode, customer_id, address_id]);
        //if the specified address is not associated with the specified customer, forward an error to the error-handling middleware
        if(updateAddress.rows.length === 0) {
            return next(new Error('This address is not associated with this customer id!'));
        }
        //otherwise, return a success message
        return res.status(200).json('Your address has been updated successfully.');
    } catch(err) {
        //forward error to the error-handling middleware
        return next(err);
    }
});

//delete an address
router.delete('/:customer_id/:address_id', async (req, res, next) => {
    //define customer_id and address_id
    const { customer_id, address_id } = req.params;
    try {
        //delete address from database
        const deleteAddress = await pool.query('DELETE FROM Addresses WHERE customer_id = $1 AND id = $2',
            [customer_id, address_id]);
        //return a success message
        res.status(200).json('Address deleted successfully');
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
});

//export the router
module.exports = router;