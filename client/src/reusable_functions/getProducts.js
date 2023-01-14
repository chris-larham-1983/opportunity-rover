//customer notification
import { toast } from 'react-toastify';

export default async function getProducts() {
    try {
        //get products
        const getAllProducts = await fetch('/products', {
            method: "GET"
        });
        //process response
        const allProducts = await getAllProducts.json();
        //return products
        return allProducts;
    } catch(err) {
        //notify customer if error occurs
        toast.error('An error occurred while retrieving products from the database.  Please refresh the page.');
    }
}