//React setup
import React, { useEffect, useRef, useState } from 'react';
//components
import Header from '../components/Header';
import Footer from '../components/Footer';
//functions
import getCartItems from '../reusable_functions/getCartItems';
import getLastOrder from '../reusable_functions/getLastOrder';
import updateOrdersAndClearCart from '../reusable_functions/updateOrdersAndClearCart';
//styling
import styles from '../styling/styling.module.css';

//a prop-less page
const Success = () => {
    //return message variable and setter function
    const [returnMessage, setReturnMessage] = useState("");
    //order items variable and setter function
    const [orderItems, setOrderItems] = useState(null);
    //last order variable and setter function
    const [lastOrder, setLastOrder] = useState([]);

    //variable created to ensure that only 1 request gets sent to GET /cart/customer_id and GET /cart/customer_id/checkoutCompleteMessage
    //and that only 1 request gets sent to GET /orders/:customer_id/last_order and GET /orders/:customer_id/:order_id
    const requestsSent = useRef({
        getCartItems: 0,
        cartCleared: 0,
        lastOrder: 0
    });

    //page load logic
    useEffect(() => {
        //get the items in the customer's cart, if they haven't already been retrieved
        if(requestsSent.current.getCartItems === 0) {
            getCartItems().then(orderItems => setOrderItems(orderItems));
            requestsSent.current.getCartItems += 1;
        }
        //update the customer's orders and clear the customer's cart, if it hasn't already been cleared
        if(requestsSent.current.cartCleared === 0) {
            updateOrdersAndClearCart().then(returnMessage => setReturnMessage(returnMessage));
            requestsSent.current.cartCleared += 1;
        }
        //get the customer's last order, if it hasn't already been retrieved
        if(requestsSent.current.lastOrder === 0) {
            getLastOrder().then(lastOrder => setLastOrder(lastOrder));
            requestsSent.current.lastOrder += 1;
        }
    }, []);

    //variables to ensure correct grammar
    const plural = `items`;
    const singular = `item`;

    //<Success /> page presentation
    return (
        <div className={styles.bodyStyles}>
            <Header navButtons={['Shop', 'Dashboard']} />
            <div className={styles.successDiv}>
                <h1 className={styles.successH1}>Thank you for your order &#x1F603;</h1>
                <p className={styles.successPara}>{returnMessage !== 'Your cart is empty so there is nothing to process!' && returnMessage}</p>
            </div>
            {orderItems && orderItems.length > 0 &&
            <figure className={styles.orderOverviewBorder}>
                <figcaption className={styles.cartOverviewCaption}>Order Details</figcaption>
                <ul className={styles.cartItemisation}>
                    {orderItems.map((orderItem, index) => (
                        <li key={index} className={styles.cartItems}>
                            <strong>{orderItem.product_name}:</strong> <em>{orderItem.product_description}</em>. <br/>
                            <strong>{orderItem.product_quantity} {orderItem.product_quantity > 1? plural:singular} @ £{(orderItem.product_price / 100).toFixed(2)} = £{(orderItem.cumulative_product_price / 100).toFixed(2)}</strong><br/>
                            <img src={orderItem.product_image_url} alt="Martian photography." width="300px" />
                        </li>
                    ))}
                </ul>
                <p className={styles.transactionTotalPara}>
                    <strong>Transaction Total:</strong> £{(orderItems[0]['cart_total'] / 100).toFixed(2)}
                </p>
            </figure>}
            {
                orderItems && orderItems.length === 0 && lastOrder.length > 0 &&
                    <figure className={styles.orderHistoryBorder}>
                        <figcaption className={styles.orderHistoryCaption}>Order Details For Order #{lastOrder[0].order_id}</figcaption>
                        <ul className={styles.orderHistoryList}>
                        {lastOrder[0].cart.map((cartItem, index) => (
                            <li key={index} className={styles.orderHistoryItems}>
                                <strong>{cartItem.product_name}:</strong> <em>{cartItem.product_description}</em>. <br/>
                                <strong>{cartItem.product_quantity} {cartItem.product_quantity > 1? plural:singular} @ £{(cartItem.product_price / 100).toFixed(2)} = £{(cartItem.cumulative_product_price / 100).toFixed(2)}</strong><br/>
                                <img src={cartItem.product_image_url} alt="Martian photography." width="300px" />
                            </li>
                        ))}
                        </ul>
                        <p className={styles.transactionTotalPara}><strong>Transaction Total:</strong> £{(lastOrder[0].cart[0]['cart_total'] / 100).toFixed(2)}</p>
                    </figure>
            }
            <Footer />
        </div>
    )
};

//export the Success page
export default Success;