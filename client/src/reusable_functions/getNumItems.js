export default async function getNumItems() {
    try {
        //1. Get the customer id
        const getCustomerId = await fetch("/cart/details/customer_id", {
            method: "GET",
            headers: {
                "token": localStorage.getItem("token")
            }
        });
        const customerId = await getCustomerId.json();
        //2. Get the customer's cart contents
        const getCartDescription = await fetch(`/cart/${customerId}`, {
            method: "GET"
        });

        const cartDescription = await getCartDescription.json();
        //3. Return an integer that represents the number of items in the customer's cart
        if(cartDescription === 'Your cart is empty.') {
            return 0;
        } else {
            let productQuantity = 0;
            for(let item in cartDescription) {
                productQuantity += cartDescription[item].product_quantity;
            }
            return productQuantity;
        }
    } catch(err) {
        //forward error to error-handling middleware
        return next(err);
    }
}