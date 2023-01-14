//React setup
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
//styling
import styles from '../styling/styling.module.css';
//components
import Header from '../components/Header';
import Footer from '../components/Footer';

//pass in a prop that manages authentication status
const Login = ({ setIsAuthenticated }) => {

    //[an object that represents the user's input, a function to set the user's input]
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    //individual variables representing user input
    const { email, password } = inputs;

    //function to respond to changing user input
    const onInputChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    //function invoked when the user clicks the 'SUBMIT' button
    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            //define a body object that represents the user's email and password
            const body = { email, password };
            //communicate with the login endpoint, attempting to log in
            const loginAttempt = await fetch('/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const loginResponse = await loginAttempt.json();
            //if a json web token was included in the response, set that token in localStorage, update the isAuthenticated state to true, and notify the user of login success
            if(loginResponse.token) {
                localStorage.setItem("token", loginResponse.token);
                setIsAuthenticated(true);
                toast.success("Login success!");
            } else { //otherwise, set isAuthenticated to false and notify the user of the login failure
                setIsAuthenticated(false);
                toast.error(`Failed to log in - ${loginResponse}`);
            }
        } catch(err) { //notify the user of login failure
            toast.error(`Failed to log in.`);
        }
    };

    //define <Login /> page's presentation
    return (
        <div className={styles.bodyStyles}>
            <Header navButtons={['Login', 'Register', 'Dashboard', 'Products']} />
            <h1 className={`text-center my-5 ${styles.h1Styles}`}>
                <span className={styles.spanStylesKhaki}>Login</span>
            </h1>
            <p className={styles.paraStyles}>
                <span className={styles.spanStylesKhaki}>Log in to add items to your shopping cart, make purchases, and view your order history.</span>
            </p>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="email" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your email address.</span>
                </label>
                <input type="email" name="email" id="email" placeholder="email" className={`form-control my-3 ${styles.inputStyles}`} value={email} onChange={e => onInputChange(e)} required />
                <label htmlFor="password" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your password.</span>
                </label>
                <input type="password" name="password" id="password" placeholder="password" className={`form-control my-3 ${styles.inputStyles}`} value={password} onChange={e => onInputChange(e)} required/>
                <button className={`btn btn-success btn-block ${styles.inputStyles}`}>Submit</button>
            </form>
            <Footer />
        </div>
    );
};

export default Login; //export <Login />