//React configuration
import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//React-Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//pages
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Products from './pages/Products';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Success from './pages/Success';
import Cancelled from "./pages/Cancelled";
//styling
import styles from './styling/styling.module.css';
import './App.css';

function App() {
    //variable and setter function to manage authentication status
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //app load function to test authentication status
    async function isAuth() {
        try {
            const getIsVerified = await fetch("/auth/is-verified", {
                method: "GET",
                headers: {
                    "token": localStorage.getItem("token")
                }
            });

            const isVerified = await getIsVerified.json();
            return isVerified;
        } catch(err) {
            toast.error('Issue with authentication.  Please email support at chrislarham@outlook.com.');
        }
    }

    //page load logic
    useEffect(() => {
        //set authentication status, and update authentication status in state whenever it changes
        isAuth().then(authenticated => setIsAuthenticated(authenticated));
    }, [isAuthenticated]);

    //set up app routes
    return (
        <Fragment>
            <ToastContainer position="top-center" className={styles.toastStyles} />
            <Router>
                <Routes>
                    <Route exact path="/login" element={isAuthenticated? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route exact path="/register" element={isAuthenticated? <Navigate to="/dashboard" />: <Register setIsAuthenticated={setIsAuthenticated} />} />
                    <Route exact path="/dashboard" element={isAuthenticated? <Dashboard setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} /> : <Navigate to="/login" />} />
                    <Route exact path="/products" element={<Products setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} />
                    <Route exact path="/products/:id" element={<Product setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} />
                    <Route exact path="/cart" element={isAuthenticated? <Cart setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />: <Navigate to="/login" />} />
                    <Route exact path="/success" element={<Success />} />
                    <Route exact path="/canceled" element={<Cancelled />} />
                    <Route path="/*" element={isAuthenticated? <Dashboard setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} /> : <Navigate to="/login" />} />
                </Routes>
            </Router>
        </Fragment>
    );
}

//export App
export default App;
