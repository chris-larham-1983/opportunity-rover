//React setup
import React, { useState } from 'react';
import { toast } from 'react-toastify';
//styling
import styles from '../styling/styling.module.css';

//pass in an address object
const Address = ({ address }) => {

    //address variables and their setters
    const [streetNumber, setStreetNumber] = useState(address['street_number']);
    const [streetName, setStreetName] = useState(address['street_name']);
    const [town, setTown] = useState(address['town']);
    const [county, setCounty] = useState(address['county']);
    const [country, setCountry] = useState(address['country']);
    const [postcode, setPostcode] = useState(address['postcode']);
    const customerId = address['customer_id'];
    const addressId = address['id'];

    //function to ensure all input fields have been completed
    const validAddress = (streetNumber, streetName, town, county, country, postcode) => {
        if(streetNumber.trim().length >= 1 && streetName.trim().length >= 1 && town.trim().length >= 1 && county.trim().length >= 1 && country.trim().length >= 1 && postcode.trim().length >= 1) {
            return true;
        }
        return false;
    };

    //function to update a customer address
    const updateAddress = async (e) => {
        e.preventDefault();
        //notify customer if all input fields are not correctly filled in
        if(!validAddress(streetNumber, streetName, town, county, country, postcode)) {
            return toast.error('Invalid Address!  All inputs are required!');
        }
        //define a request body that represents the new address
        const body = {
            street_number: streetNumber,
            street_name: streetName,
            town: town,
            county: county,
            country: country,
            postcode: postcode
        };
        //update the customer address
        const updateAddress = await fetch(`/addresses/${customerId}/${addressId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        //process response
        const updateMessage = await updateAddress.json();
        //notify customer of update success/failure
        if(updateMessage === 'Your address has been updated successfully.') {
            toast.success('Address successfully updated!');
        } else {
            toast.error(`Error with update: ${updateMessage}`);
        }
    };

    //define presentation of <Address />
    return (
        <figure>
            <figcaption className={styles.deliveryAddress}>Delivery Address Details:</figcaption>
            <ul>
                <li className={styles.addressLi}>
                    <form onSubmit={e => updateAddress(e)} className={styles.addressSpecifics} >
                        <label htmlFor="streetNumber" className={styles.addressLabel}>Property Name/Number: &nbsp;
                            <input type="text" name="streetNumber" id="streetNumber" contentEditable="true" value={streetNumber} minLength="1" onChange={e => setStreetNumber(e.target.value)} required />
                        </label>
                        <label htmlFor="streetName" className={styles.addressLabel}>Street Name: &nbsp;
                            <input type="text" name="streetName" id="streetName" contentEditable="true" value={streetName} minLength="1" onChange={e => setStreetName(e.target.value)} required />
                        </label>
                        <label htmlFor="town" className={styles.addressLabel}>Town: &nbsp;
                            <input type="text" name="town" id="town" contentEditable="true" value={town} minLength="1" onChange={e => setTown(e.target.value)} required />
                        </label>
                        <label htmlFor="county" className={styles.addressLabel}>County: &nbsp;
                            <input type="text" name="county" id="county" contentEditable="true" value={county} minLength="1" onChange={e => setCounty(e.target.value)} required />
                        </label>
                        <label htmlFor="country" className={styles.addressLabel}>Country: &nbsp;
                            <input type="text" name="country" id="country" contentEditable="true" value={country} minLength="1" onChange={e => setCountry(e.target.value)} required />
                        </label>
                        <label htmlFor="postcode" className={styles.addressLabel}>Postcode: &nbsp;
                            <input type="text" name="postcode" id="postcode" contentEditable="true" value={postcode} minLength="1" onChange={e => setPostcode(e.target.value)} required />
                        </label>
                        <button className={styles.updateAddress}>UPDATE ADDRESS</button>
                    </form>
                </li>
            </ul>
        </figure>
    )
};

export default Address; //export the <Address /> component