//React setup
import React, { useState } from 'react';
import { toast } from 'react-toastify';
//styling
import styles from '../styling/styling.module.css';

//pass in the product details, product id, number of items in the cart, and a setter function for the number of cart items
const AddToCart = ({ productDetails, id, itemsInCart, setItemsInCart }) => {

    //quantity variable and setter function
    const [quantity, setQuantity] = useState(0);

    //function to update the quantity of an item
    const updateQuantity = async(e) => {
        //if the quantity is a valid integer
        if(Number.isInteger(parseInt(e.target.value))) {
            try {
                //set the quantity
                await setQuantity(e.target.value);
            } catch(err) {
                //notify customer if error occurs
                toast.error('Error while trying to update quantity.');
            }
        } else {
            //otherwise, set input's value to quantity
            document.getElementById("quantity").value = quantity;
        }
    };

    //add item(s) to the customer's cart
    const addToCart = async () => {
        //only progress if quantity is greater than 0
        if(quantity > 0) {
            try {
                //get customer details
                const getCustomerId = await fetch('/cart/details/customer_id', {
                    method: 'GET',
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                });
                //process response
                const customer_id = await getCustomerId.json();
                //define a request body, encapsulating product_id and product_quantity
                const body = {
                    product_id: id,
                    product_quantity: quantity
                };
                //post items to cart
                const addItemsToCart = await fetch(`/cart/${customer_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
                //process response
                const addedItems = await addItemsToCart.json();
                //update number of items in customer's cart
                const singular = `${addedItems} item added to cart!`;
                const plural = `${addedItems} items added to cart!`;
                //notify customer of successful addition of item(s)
                toast.success(addedItems > 1? plural:singular);
                //update the number of items in the customer's cart
                setItemsInCart(itemsInCart + parseInt(addedItems));
            } catch(err) {
                toast.error('An error occurred while trying to add items to your cart.');
            }
        } else {
            toast.error('Cannot add 0 items to cart!');
        }
    };

    //add item to customer's wishlist
    const addToWishlist = async () => {
        try {
            //get customer id from /cart/details/customer_id endpoint
            const getCustomerId = await fetch('/cart/details/customer_id', {
                method: 'GET',
                headers: {
                    'token': localStorage.getItem('token')
                }
            });
            //process response
            const customerId = await getCustomerId.json();
            //get customer name
            const getCustomerName = await fetch('/cart/details/customer_name', {
                method: 'GET',
                headers: {
                    'customer_id': customerId
                }
            });
            //process response
            const customerName = await getCustomerName.json();
            //define product name and the URL to the product
            const productName = productDetails.item_name;
            const linkToProduct = window.location.href;
            //create a request body that defines the wishlist description
            const body = {
                'description': `${productName} (${linkToProduct})`
            }
            //add item to wishlist
            const addToWishlist = await fetch('/wishlist', {
                method: 'POST',
                headers: {
                    'user_name': customerName,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            //process response
            const wishlistMessage = await addToWishlist.json();
            //notify the customer of successful wishlist addition
            if(wishlistMessage === "Wishlist item was added.") {
                toast.success('Item added to wishlist!');
            }
        } catch(err) {
            //notify customer of wishlist addition failure
            toast.failure('Problem adding item to wishlist.');
        }
    };

    //define the <AddToCart /> presentation
    return (
        <div className={styles.addToCart} >
            <p className={styles.addToCartPrice}>
                Price: £{(productDetails.price / 100).toFixed(2)}<br/>
                (&darr;Quantity&darr;)
            </p>
            <button
                className={styles.addToCartButton}
                onClick={addToCart}
            >
                Add To Cart
            </button>
            <input
                id={"quantity"}
                type="number"
                className={styles.addToCartQuantity}
                placeholder={"Quantity"}
                min={0}
                onChange={(e) => updateQuantity(e)}
                value={quantity}
            />
            <button className={styles.addToWishlist} onClick={addToWishlist} >Add Item To Wishlist</button>
        </div>
    )
};

//export the <AddToCart /> component
export default AddToCart;