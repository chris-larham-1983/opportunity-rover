//customer notification
import { toast } from 'react-toastify';

export default async function updateOrdersAndClearCart() {
    try {
        //1. get customer id
        const getCustomerId = await fetch('/cart/details/customer_id', {
            method: 'GET',
            headers: {
                'token': localStorage.getItem('token')
            }
        });
        //process the response
        const customer_id = await getCustomerId.json();
        //2. update the customer's order history and clear their cart
        const updateOrdersAndClearCart = await fetch(`/cart/${customer_id}/checkoutCompleteMessage`, {
            method: 'GET',
        });
        //process the response
        const returnMessage = await updateOrdersAndClearCart.json();
        if(returnMessage !== 'Your cart is empty so there is nothing to process!') {
            toast.success('Transaction Success!');
        }
        //return checkout complete message
        return returnMessage;
    } catch(err) {
        //notify customer if error occurs
        toast.error('Transaction Error!');
    }
};