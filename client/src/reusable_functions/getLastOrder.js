//customer notification
import { toast } from 'react-toastify';

export default async function getLastOrder() {
    try {
        //1. get the customer_id
        const getCustomerId = await fetch('/cart/details/customer_id', {
            method: 'GET',
            headers: {
                'token': localStorage.getItem('token')
            }
        });
        //process the response
        const customerId = await getCustomerId.json();
        //2. get the order id for the last order made by the customer
        const getLastOrderId = await fetch(`orders/${customerId}/last_order`, {
            method: 'GET'
        });
        //process the response
        const lastOrderId = await getLastOrderId.json();
        //3. get the order details for the last order made by the customer
        const getLastOrderDetails = await fetch(`orders/${customerId}/${lastOrderId}`, {
            method: 'GET'
        });
        //process the response
        const lastOrderDetails = await getLastOrderDetails.json();
        //4. Return the details of the last order that the customer made
        return lastOrderDetails;
    } catch(err) {
        //notify customer if error occurs
        toast.error('An error occurred while trying to retrieve your last order.');
    }
}