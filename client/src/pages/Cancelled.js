//React setup
import React, { useEffect, useRef, useState } from 'react';
//components
import Header from '../components/Header';
import Footer from '../components/Footer';
//styling
import styles from '../styling/styling.module.css';
//function
import getCartItems from '../reusable_functions/getCartItems';
//empty trolley image
import empty_cart from "../images/empty_trolley.png";

//a prop-less page
const Cancelled = () => {
    //cart items variable and setter function
    const [cartItems, setCartItems] = useState(null);
    //variables to ensure grammatical correctness
    const plural = `items`;
    const singular = `item`;
    //show cart items variable and setter function
    const [showCartItems, setShowCartItems] = useState(false);
    //variable to ensure that only 1 request gets sent to GET /cart/:customer_id
    const requestsSent = useRef({
        getCartItems: 0
    });

    //page load logic
    useEffect(() => {
        //retrieve the customer's cart items, if they haven't already been retrieved
        if(requestsSent.current.getCartItems === 0) {
            getCartItems().then(cartItems => setCartItems(cartItems));
            requestsSent.current.getCartItems += 1;
            setShowCartItems(true);
        }
    }, []);

    //<Cancelled /> page presentation
    return (
        <div className={styles.bodyStyles}>
            <Header navButtons={['Shop', 'Dashboard']} />
            <div className={styles.failureDiv}>
                <h1 className={styles.failureH1}>Transaction Cancelled &#x1F641;</h1>
                <p className={styles.failurePara}>Payment was not successful.  An overview of your cart can be seen below.</p>
            </div>
            {
                showCartItems && cartItems && cartItems.length > 0?
                <figure className={styles.cartOverviewBorder}>
                    <figcaption className={styles.cartOverviewCaption}>Cart Details</figcaption>
                    <ul className={styles.cartItemisation}>
                        {cartItems.map((cartItem, index) => (
                            <li key={index} className={styles.cartItems}>
                                <strong>{cartItem.product_name}:</strong> <em>{cartItem.product_description}</em>. <br/>
                                <strong>{cartItem.product_quantity} {cartItem.product_quantity > 1? plural:singular} @ £{(cartItem.product_price / 100).toFixed(2)} = £{(cartItem.cumulative_product_price / 100).toFixed(2)}</strong><br/>
                                <img src={cartItem.product_image_url} alt="Martian photography." width="300px" />
                            </li>
                        ))}
                    </ul>
                    <p className={styles.transactionTotalPara}><strong>Transaction Total:</strong> £{(cartItems[0]['cart_total'] / 100).toFixed(2)}</p>
                </figure>: showCartItems && cartItems && cartItems.length === 0?
                <div>
                    <p className={styles.cartEmptyPara}>Your cart is empty.</p>
                    <img src={empty_cart} alt="Empty shopping cart." className={styles.canceledEmptyTrolley} />
                </div>:<p></p>
            }
            <Footer />
        </div>
    )
};

//export the <Cancelled /> page
export default Cancelled;