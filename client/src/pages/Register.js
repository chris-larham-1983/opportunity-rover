//React setup
import React, { useState } from 'react';
import { toast } from 'react-toastify';
//Styling
import styles from '../styling/styling.module.css';
//Components
import Header from '../components/Header';
import Footer from '../components/Footer';

//pass in prop to manage authentication status
const Register = ({ setIsAuthenticated }) => {

    //[object that represents registration inputs, a function to set those inputs]
    const [inputs, setInputs] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password_check: "",
        street_number: "",
        street_name: "",
        town: "",
        county: "",
        country: "",
        postcode: ""
    });

    //individual registration input variables
    const { first_name, last_name, username, email, password, password_check, street_number, street_name, town, county, country, postcode } = inputs;

    //function to set the registration input object's values
    const onInputChange = e => {
        setInputs({...inputs, [e.target.name] : e.target.value });
    };

    //function to ensure that all inputs have been filled in by the prospective customer
    const validInputs = (first_name, last_name, username, email, password, password_check, street_number, street_name, town, county, country, postcode) => {
        //return true if all fields have been filled in
        if(first_name.trim().length >= 1 && last_name.trim().length >= 1 && username.trim().length >= 1 && email.trim().length >= 1 && password.trim().length >= 1 && password_check.trim().length >= 1 &&
        street_number.trim().length >= 1 && street_name.trim().length >= 1 && town.trim().length >= 1 && county.trim().length >= 1 && country.trim().length >= 1 && postcode.trim().length >= 1) {
            return true;
        }
        //otherwise, return false
        return false;
    };

    //function invoked when customer clicks the 'SUBMIT' button
    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            //notify user if password field differs from the retyped password field; return without further processing
            if(password !== password_check) {
                toast.error('Re-typed password does not match original.');
                return;
            }
            //notify user if not all fields are filled in
            if(!validInputs(first_name, last_name, username, email, password, password_check, street_number, street_name, town, county, country, postcode)) {
                return toast.error('Registration Error! All inputs are required.');
            }
            //define a 'body' object that represents all customer-inputted data
            const body = { first_name, last_name, username, email, password, street_number, street_name, town, county, country, postcode };
            //send the customer's data to the registration endpoint
            const attemptRegistration = await fetch("/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            //process the response
            const registration = await attemptRegistration.json();
            //if the registration attempt is successful: set a 'token' variable in localStorage; set isAuthenticated to true; and notify the customer
            if(registration.token) {
                localStorage.setItem("token", registration.token);
                setIsAuthenticated(true);
                toast.success('Registration Success!');
            } else {
                //otherwise, set isAuthenticated to false and notify the customer that registration was unsuccessful
                setIsAuthenticated(false);
                toast.error(`Registration failed - ${registration}`);
            }
        } catch(err) { //notify the customer in the case of an error
            toast.error(`Registration Error! Please contact support at chrislarham@outlook.com with details of your issue.`);
        }
    }

    //define the <Register /> page's presentation
    return (
        <div className={styles.bodyStyles}>
            <Header navButtons={['Login', 'Register', 'Dashboard', 'Products']} />
            <h1 className={`text-center my-5 ${styles.h1Styles}`}>
                <span className={styles.spanStylesKhaki}>Register</span>
            </h1>
            <p className={styles.paraStyles}>
                <span className={styles.spanStylesKhaki}>Register for an account to access your personal dashboard and begin shopping.</span>
            </p>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="first_name" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your first name.</span>
                </label>
                <input type="text" maxLength="30" name="first_name" placeholder="first name" className={`form-control my-3 ${styles.inputStyles}`} value={first_name} onChange={e => onInputChange(e)} required />
                <label htmlFor="last_name" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your surname.</span>
                </label>
                <input type="text" maxLength="30" name="last_name" placeholder="surname" className={`form-control my-3 ${styles.inputStyles}`} value={last_name} onChange={e => onInputChange(e)} required />
                <label htmlFor="username" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your username.</span>
                </label>
                <input type="text" maxLength="30" name="username" placeholder="username" className={`form-control my-3 ${styles.inputStyles}`} value={username} onChange={e => onInputChange(e)} required />
                <label htmlFor="email" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your email address.</span>
                </label>
                <input type="email" maxLength="320" name="email" placeholder="email" className={`form-control my-3 ${styles.inputStyles}`} value={email} onChange={e => onInputChange(e)} required />
                <label htmlFor="password" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your password.</span>
                </label>
                <input type="password" maxLength="255" name="password" placeholder="password" className={`form-control my-3 ${styles.inputStyles}`} value={password} onChange={e => onInputChange(e)} required />
                <label htmlFor="password_check" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Re-enter your password.</span>
                </label>
                <input type="password" maxLength="255" name="password_check" placeholder="re-enter your password" className={`form-control my-3 ${styles.inputStyles}`} value={password_check} onChange={e => onInputChange(e)} required />
                <label htmlFor="street_number" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your property name/street number.</span>
                </label>
                <input type="text" maxLength="30" name="street_number" placeholder="street number" className={`form-control my-3 ${styles.inputStyles}`} value={street_number} onChange={e => onInputChange(e)} required />
                <label htmlFor="street_name" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your street name.</span>
                </label>
                <input type="text" maxLength="50" name="street_name" placeholder="street name" className={`form-control my-3 ${styles.inputStyles}`} value={street_name} onChange={e => onInputChange(e)} required />
                <label htmlFor="town" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your town/city.</span>
                </label>
                <input type="text" maxLength="100" name="town" placeholder="town/city" className={`form-control my-3 ${styles.inputStyles}`} value={town} onChange={e => onInputChange(e)} required />
                <label htmlFor="county" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your county.</span>
                </label>
                <input type="text" maxLength="60" name="county" placeholder="county" className={`form-control my-3 ${styles.inputStyles}`} value={county} onChange={e => onInputChange(e)} required />
                <label htmlFor="country" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your country.</span>
                </label>
                <input type="text" maxLength="60" name="country" placeholder="country" className={`form-control my-3 ${styles.inputStyles}`} value={country} onChange={e => onInputChange(e)} required />
                <label htmlFor="postcode" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your postcode / zip code.</span>
                </label>
                <input type="text" maxLength="10" name="postcode" placeholder="postcode" className={`form-control my-3 ${styles.inputStyles}`} value={postcode} onChange={e => onInputChange(e)} required />
                <button className={`btn btn-success btn-block ${styles.inputStyles}`}>Submit</button>
            </form>
            <Footer />
        </div>
    );
};

export default Register; //export the <Register /> component