//React setup
import React, { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
//functions
import fetchFromAPI from '../reusable_functions/fetchFromAPI';
import getEmail from '../reusable_functions/getEmail';
//styling
import styles from '../styling/styling.module.css';

//pass in the items in the customer's cart
const StripeCheckout = ({ cartItems }) => {
    //email variable and setter function
    const [email, setEmail] = useState('');
    //allow use of stripe functionality
    const stripe = useStripe();

    //page load logic
    useEffect(() => {
        //get the customer's email
        getEmail().then(email => setEmail(email));
    }, []);

    //function to handle the customer's checkout process
    const handleCheckout = async (e) => {
        e.preventDefault();
        //define the stripe-required 'line_items'
        const line_items = cartItems.map(cartItem => {
            return {
                quantity: cartItem.product_quantity,
                price_data: {
                    currency: 'gbp',
                    unit_amount: cartItem.product_price, //amount in pence
                    product_data: {
                        name: cartItem.product_name,
                        description: cartItem.product_description,
                        images: [cartItem.product_image_url]
                    }
                }
            }
        });
        //notify customer of impending Stripe Checkout redirect
        toast.info('Redirecting to Stripe Checkout...');
        //pass the /create-checkout-session endpoint and an options object that includes 'line_items' and 'customer_email' to the fetchFromAPI function
        const getSessionId = await fetchFromAPI('create-checkout-session', {
            body: { line_items, customer_email: email }
        });
        //obtain session id from
        const { sessionId } = getSessionId;
        //define error if one occurs during redirection to Stripe checkout
        const { error } = await stripe.redirectToCheckout({
            sessionId
        });
        //notify customer if error occurs
        if(error) {
            toast.error('Unable to redirect to Stripe Checkout!');
        }
    }
    //<StripeCheckout /> presentation
    return (
        <form onSubmit={handleCheckout}>
            <div className={styles.emailAndCheckout}>
                <label htmlFor="email" className={styles.labelStyles}>Verify your email address.
                    <input
                        type='email'
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Email'
                        value={email}
                        className={styles.inputStyles}
                        id="email"
                    />
                </label>
            </div>
            <div>
                <button className={styles.checkoutButton} type="submit">
                    PROCEED TO PAYMENT
                </button>
            </div>
        </form>
    )
};

//export the <StripeCheckout /> component
export default StripeCheckout;