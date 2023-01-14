//React setup
import React, { useState } from 'react';
//customer notification
import { toast } from 'react-toastify';
//styling
import styles from '../styling/styling.module.css';

//pass in all the relevant product properties
const CartItem = ({ product_id, product_image_url, product_name, product_price, product_quantity, cumulative_product_price, getNumItems, setNumItems, added_to_cart }) => {

    //product quantity variable and setter
    const [productQuantity, setProductQuantity] = useState(product_quantity);

    //function to update the product quantity
    const updateProductQuantity = async (e) => {
        //if the input quantity is an integer
        if(Number.isInteger(parseInt(e.target.value))) {
            try {
                //set productQuantity to the input value
                await setProductQuantity(e.target.value);
            } catch(err) {
                toast.error('An error occurred while trying to update the product quantity.');
            }
        } else {
            //otherwise, set the input value to the current productQuantity
            document.getElementById("updateProductQuantity").value = productQuantity;
        }
    }

    //function to delete an item from the customer's cart
    const deleteFromCart = async () => {
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
            //communicate with the DELETE /cart/:customer_id/:product_id endpoint to delete the specified item from the customer's cart
            const deleteItem = await fetch(`/cart/${customerId}/${product_id}`, {
                method: 'DELETE',
                headers: {
                    'added_to_cart': added_to_cart
                }
            });
            //process the result
            const deletedItem = await deleteItem.json();
            //update the number of items in the customer's cart if the deletion was successful
            if(deletedItem === 'Deletion success!') {
                getNumItems().then(numItems => setNumItems(numItems));
            } else {
                toast.error('An error occurred while trying to delete item.');
            }
        } catch(err) {
            toast.error('An error occurred while trying to delete item.');
        }
    }

    //function to update the customer's cart
    const updateCart = async () => {
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
            //create a body object for the subsequent PUT request
            const body = {
                product_id: product_id,
                product_quantity: productQuantity,
                added_to_cart: added_to_cart
            };
            //communicate with the PUT /cart/:customer_id endpoint to update the customer's cart
            const updateCart = await fetch(`/cart/${customerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            //process the response
            const updatedCart = await updateCart.json();
            //update the customer's cart if update is successful
            if(updatedCart === 'Update success!') {
                getNumItems().then(numItems => setNumItems(numItems));
            } else {
                toast.error('An error occurred while trying to update your cart.');
            }
        } catch(err) {
            toast.error('An error occurred while trying to update your cart.');
        }
    }

    //variables to ensure correct grammar
    const singular = 'item';
    const plural = 'items';

    //<CartItem /> presentation
    return(
        <div className={styles.cartItemStyles}>
            <img src={product_image_url} className={styles.cartImages} alt="Martian Photography" />
            <span className={styles.cartProductName}>{product_name}</span>
            <p className={styles.cartItemDetails}>{product_quantity} {product_quantity > 1? plural:singular} @ £{(product_price / 100).toFixed(2)} = £{(cumulative_product_price/100).toFixed(2)}</p>
            <input type="number"
                   id="updateProductQuantity"
                   className={styles.cartUpdateQuantityInput}
                   min={1}
                   value={productQuantity}
                   onChange={e => updateProductQuantity(e)}
            />
            <button className={styles.cartUpdateQuantityButton} onClick={updateCart}>UPDATE QUANTITY</button>
            <button className={styles.cartDeleteButton} onClick={deleteFromCart}>DELETE</button>
        </div>
    )
};

//export the <CartItem /> component
export default CartItem;