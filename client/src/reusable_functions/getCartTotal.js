//customer notification
import { toast } from 'react-toastify';

export default async function getCartTotal() {
    try {
        //get the customer id
        const getCustomerId = await fetch('/cart/details/customer_id', {
            method: 'GET',
            headers: {
                'token': localStorage.getItem('token')
            }
        });
        //process the response
        const customerId = await getCustomerId.json();
        //get the cart description for the specified customer
        const getCartDescription = await fetch(`/cart/${customerId}`, {
            method: 'GET'
        });
        //process the response
        const cartDescription = await getCartDescription.json();
        //define and return the cart total
        const cartTotal = cartDescription[0]['cart_total'];
        return cartTotal;
    } catch(err) {
        toast.error('An error occurred while retrieving the total cost of your items.');
    }
}