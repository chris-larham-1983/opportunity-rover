//customer notification
import { toast } from 'react-toastify';

export default async function getEmail() {
    try {
        //get the customer id
        const getCustomerId = await fetch('/cart/details/customer_id', {
            method: 'GET',
            headers: {
                'token': localStorage.getItem('token')
            }
        });
        //process response
        const customerId = await getCustomerId.json();
        //get the customer's email address
        const getEmail = await fetch('/cart/details/email', {
            method: 'GET',
            headers: {
                'customer_id': customerId
            }
        });
        //process the response and return the email
        const email = await getEmail.json();
        return email;
    } catch(err) {
        toast.error('An error occurred when attempting to retrieve your email address.');
    }
}