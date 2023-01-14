//React setup
import React from 'react';
//styling
import styles from '../styling/styling.module.css';

//pass in an order object
const OrderHistoryItem = ({ order }) => {

    //variables for correct grammar
    const singular = 'item';
    const plural = 'items';

    //define presentation of <OrderHistoryItem />
    return (
        <figure key={order.order_id} className={styles.orderHistoryBorder}>
            <figcaption className={styles.orderHistoryCaption}>Order Details for Order #{order.order_id}, <em>{order.string_date_of_purchase}</em></figcaption>
            <ul className={styles.orderHistoryList}>
                {order.cart.map((cartItem, index) => (
                    <li key={index} className={styles.orderHistoryItems}>
                            <strong>{cartItem.product_name}:</strong> <em>{cartItem.product_description}</em>. <br/>
                            <strong>{cartItem.product_quantity} {cartItem.product_quantity > 1? plural:singular} @ £{(cartItem.product_price / 100).toFixed(2)} = £{(cartItem.cumulative_product_price / 100).toFixed(2)}</strong><br/>
                            <img src={cartItem.product_image_url} alt="Martian photography." width="300px" />
                    </li>
                ))}
                <li className={styles.orderHistoryItems}>
                    <span className={styles.spanStylesLightGreen}><strong>Transaction Total:</strong> £{(order.cart[0]['cart_total'] / 100).toFixed(2)}</span>
                </li>
            </ul>
        </figure>
    )
};

//export <OrderHistoryItem />
export default OrderHistoryItem;