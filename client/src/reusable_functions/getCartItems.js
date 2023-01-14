//customer notification
import { toast } from 'react-toastify';

export default async function getCartItems() {
    try {
        //1. Get the customer id
        const getCustomerId = await fetch('/cart/details/customer_id', {
            method: 'GET',
            headers: {
                'token': localStorage.getItem('token')
            }
        });
        //process the response
        const customerId = await getCustomerId.json();
        //2. Get an overview of the customer's shopping cart
        const getCartDescription = await fetch(`cart/${customerId}`, {
            method: 'GET'
        });
        //process response
        const cartDescription = await getCartDescription.json();
        //3. Return an appropriate overview of the customer's shopping cart
        if(cartDescription === 'Your cart is empty.') {
            return [];
        }
        return cartDescription;
    } catch(err) {
        //notify customer if error occurs
        toast.error('An error occurred while retrieving your cart details.  Try refreshing the page.');
    }
}