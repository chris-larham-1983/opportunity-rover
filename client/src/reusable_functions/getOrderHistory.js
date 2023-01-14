//customer notifications
import { toast } from 'react-toastify';
//export getOrderHistory() function
export default async function getOrderHistory() {
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
        //get the customer's order history
        const getOrderHistory = await fetch(`/orders/${customerId}`, {
            method: 'GET'
        });
        //process the response
        const orderHistory = await getOrderHistory.json();
        //return the order history
        return orderHistory;
    } catch(err) {
        //notify customer if error occurs
        toast.error('An error occurred while attempting to retrieve your order history.');
    }
}