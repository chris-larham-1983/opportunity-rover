//customer notifications
import { toast } from 'react-toastify';
//export getAddress() function
export default async function getAddress() {
    try {
        //get customer id
        const getCustomerId = await fetch('/cart/details/customer_id', {
            method: 'GET',
            headers: {
                'token': localStorage.getItem('token')
            }
        });
        //process the response
        const customerId = await getCustomerId.json();
        //get customer address
        const getAddress = await fetch(`/addresses/${customerId}`, {
            method: 'GET'
        });
        //process the response
        const address = await getAddress.json();
        //return the address
        return address;
    } catch(err) {
        toast.error('An error occurred while retrieving your address details.');
    }
}