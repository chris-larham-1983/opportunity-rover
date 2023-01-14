//React setup
import React, { useEffect, useRef, useState } from 'react';
//styling
import styles from '../styling/styling.module.css';
//components
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import StripeCheckout from '../components/StripeCheckout';
import Footer from '../components/Footer';
//functions
import getNumItems from '../reusable_functions/getNumItems';
import getCartItems from '../reusable_functions/getCartItems';
import getCartTotal from '../reusable_functions/getCartTotal';
import getAddress from '../reusable_functions/getAddress';
//empty trolley image
import empty_cart from '../images/empty_trolley.png';

//pass authentication status variable and setter function
const Cart = ({ setIsAuthenticated, isAuthenticated }) => {

    //variables and setter functions
    const [products, setProducts] = useState([]);
    const [numItems, setNumItems] = useState(-1);
    const [cartTotal, setCartTotal] = useState(0);
    const [address, setAddress] = useState([]);

    //variable to stop unnecessary address requests
    const requestsSent = useRef({
        getAddress: 0
    });

    //page load logic
    useEffect(() => {
        //set authentication status to false and the number of items in the unauthenticated customer's cart to 0
        if(!localStorage.getItem('token')) {
            setIsAuthenticated(false);
            setNumItems(0);
        }
        //for the authenticated customer...
        if(isAuthenticated) {
            //define the number of items in their cart...
            getNumItems().then(numItems => setNumItems(numItems));
            //define the actual products in their cart...
            getCartItems().then(products => setProducts(products));
            //define the total value of their cart...
            getCartTotal().then(cartTotal => setCartTotal(cartTotal));
            //...and define their address, if it hasn't already been defined
            if(requestsSent.current.getAddress === 0) {
                getAddress().then(address => setAddress(address));
                requestsSent.current.getAddress += 1;
            }
        }
        //re-run this logic when the number of items in the customer's cart changes
    }, [numItems]);

    //define the <Cart /> presentation
    return(
        <div className={styles.bodyStyles}>
            <Header navButtons={['Login', 'Register', 'Dashboard', 'Products']} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <h1 className={styles.cartHeaderStyles}>Cart Details</h1>
            <div className={styles.productImages}>
                { numItems > 0? products.map(product => (
                    <CartItem key={product.added_to_cart}
                              product_id={product.product_id}
                              product_name={product.product_name}
                              product_image_url={product.product_image_url}
                              product_price={product.product_price}
                              product_quantity={product.product_quantity}
                              cumulative_product_price={product.cumulative_product_price}
                              added_to_cart={product.added_to_cart}
                              setNumItems={setNumItems}
                              getNumItems={getNumItems}
                    />
                )): numItems === 0? <div>
                                        <p className={styles.cartEmptyPara}>Your shopping cart is empty.</p>
                                        <img src={empty_cart} alt="Empty shopping cart." width="100%" />
                                    </div>: <p className={styles.retrievingCartStyles}>Retrieving your cart details.</p>}
            </div>
            {numItems > 0 &&
            <div>
                <p className={styles.cartTotalStyles}>Cart Total: £{(cartTotal / 100).toFixed(2)}</p>
                <div className={styles.addressDetailsStyles}><h2>DELIVERY ADDRESS DETAILS:</h2>
                    {address.length > 0 &&
                    <ul>
                        <li>{address[0]['street_number']} {address[0]['street_name']}</li>
                        <li>{address[0]['town']}</li>
                        <li>{address[0]['county']}</li>
                        <li>{address[0]['country']}</li>
                        <li>{address[0]['postcode']}</li>
                    </ul>}
                    <p>&#9889; Go to your dashboard to update the delivery address &#9889;</p>
                </div>
                <StripeCheckout cartItems={products} />
            </div>}
            <Footer />
        </div>
    )
};

//export the <Cart /> page
export default Cart;