//React setup
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
//styling
import styles from '../styling/styling.module.css';

//pass in the following props: an array of strings to use on the navigational buttons; a function to set the authentication status; and the authentication status itself
const Header = ({ navButtons, setIsAuthenticated, isAuthenticated }) => {

    //logout logic
    const logout = e => {
        e.preventDefault();
        //remove the json web token from localStorage; set the authentication state to false; and notify the user of successful logout
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        toast.success("Logout Success!");
    }

    //define the <Header /> component's presentation
    return (
        <header className={styles.headerStyles} id="header">
            <nav className={styles.headerNavStyles}>
                <ul className={styles.headerNavUlStyles}>
                    {navButtons && navButtons.map(navButton => (
                        (navButton === 'Logout' || (navButton === 'Login' && isAuthenticated === true))?
                            <li key="Logout" className={styles.headerNavUlLiStyles}>
                                <button className={styles.logoutButton} onClick={e => logout(e)}>Logout</button>
                            </li>: navButton === 'Shop'?
                            <li key="products" className={styles.headerNavUlLiStyles}>
                                <Link to={'/martianproducts'} className={styles.headerNavUlLiLinkStyles}>
                                    {navButton}
                                </Link>
                            </li>:
                            <li key={`${navButton.toLowerCase()}`} className={styles.headerNavUlLiStyles}>
                                <Link to={`/martian${navButton.toLowerCase()}`} className={styles.headerNavUlLiLinkStyles}>
                                    {navButton}
                                </Link>
                            </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
};

export default Header; //export the <Header /> component