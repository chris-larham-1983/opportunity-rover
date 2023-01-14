//React setup
import React from 'react';
import { Link } from "react-router-dom";
//styling
import styles from '../styling/styling.module.css';

//pass in text to help define the heading text, plus the number of items in the customer's shopping cart
const DashboardHeader = ({ h2Text, itemsInCart }) => {
    //variable representing the number of items in the customer's cart
    const numItems = `(${itemsInCart})`;

    //define presentation of <DashboardHeader />
    return (
        <div className={styles.dashboardHeaderStyles}>
            <h2 className={styles.dashboardH2Styles}>{ h2Text }!</h2>
            <Link to={'/cart'} className={styles.cartLinkStyles}>
                <span style={{textAlign: "right", width: "100%", marginRight: "10px"}}>
                    <span style={{backgroundColor: "khaki"}}>Cart {itemsInCart? numItems:""}</span>
                </span>
            </Link>
        </div>
    )
};

//export the <DashboardHeader /> component
export default DashboardHeader;