//React setup
import React from 'react';
import { Link } from 'react-router-dom';
//styling
import styles from '../styling/styling.module.css';

//pass in: text to be used in the heading; the authentication status variable; and the number of items in the customer's cart
const ProductsHeader = ({ h1Text, isAuthenticated, itemsInCart }) => {

    //variable to display the number of items in the customer's cart
    const numItems = `(${itemsInCart})`;

    //<ProductsHeader /> presentation
    return (
        <div className={styles.productsHeaderStyles}>
            <h1 className={styles.productH1Styles} >{h1Text}</h1>
            {isAuthenticated && <Link to={'/martiancart'} className={styles.cartLinkStyles}>
                <span style={{textAlign: "right", width: "100%", marginRight: "10px"}}>
                    <span style={{backgroundColor: "khaki"}}>Cart {itemsInCart? numItems:""}</span>
                </span>
            </Link>}
        </div>
    )
};

//export the <ProductsHeader /> component
export default ProductsHeader;