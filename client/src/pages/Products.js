//React setup
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
//styling
import styles from '../styling/styling.module.css';
//components
import Header from '../components/Header';
import ProductsHeader from '../components/ProductsHeader';
import Footer from '../components/Footer';
//functions
import getProducts from '../reusable_functions/getProducts';
import getNumItems from '../reusable_functions/getNumItems';

//pass the authentication status variable and setter function
const Products = ({ isAuthenticated, setIsAuthenticated }) => {

    //variable and setter function representing the products available to browse
    const [products, setProducts] = useState([]);
    //variable and setter function representing the number of items in the customer's cart
    const [itemsInCart, setItemsInCart] = useState(0);

    //variable to limit the number of unnecessary requests sent
    const requestsSent = useRef({
        getProducts: 0,
        getNumItems: 0
    });

    //page load logic
    useEffect(() => {
        //set isAuthenticated to false if no json web token is in localStorage
        if(!localStorage.getItem('token')) {
            setIsAuthenticated(false);
        }
        //retrieve products from database
        if(requestsSent.current.getProducts === 0) {
            getProducts().then(allProducts => setProducts(allProducts));
            requestsSent.current.getProducts += 1;
        }
        //retrieve the number of items in the authenticated customer's cart
        if(isAuthenticated) {
            if(requestsSent.current.getNumItems === 0) {
                getNumItems().then(numItems => setItemsInCart(numItems));
                requestsSent.current.getNumItems += 1;
            }
        }
    }, []);

    //<Products /> presentation
    return (
        <div className={styles.bodyStyles}>
            <Header navButtons={['Login', 'Register', 'Dashboard', 'Products']} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <ProductsHeader isAuthenticated={isAuthenticated} h1Text={'Products'} itemsInCart={itemsInCart} />
            <div className={styles.productImages}>
                {products.map(product => (
                    <figure key={product.id} className={styles.figStyles}>
                        <Link to={`./${product.id}`}>
                            <img className={styles.figImgStyles} src={product.image_url} alt='Martian photo' />
                        </Link>
                        <figcaption className={styles.figFigCaptionStyles}>
                            <span className={styles.figSpanStyles}>{product.item_name}:</span><br />
                            £{(product.price / 100).toFixed(2)}
                        </figcaption>
                    </figure>
                ))}
            </div>
            <Footer />
        </div>
    )
};

//export the <Products /> page
export default Products;