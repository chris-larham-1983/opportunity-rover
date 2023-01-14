//React setup
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
//styling
import styles from '../styling/styling.module.css';
//components
import Header from '../components/Header';
import ProductsHeader from '../components/ProductsHeader';
import AddToCart from '../components/AddToCart';
import Footer from '../components/Footer';
//function
import getNumItems from '../reusable_functions/getNumItems';

//pass in the authentication status variable and setter function
const Product = ({ isAuthenticated, setIsAuthenticated }) => {

    //define id
    const { id } = useParams();
    //product details variable and setter function
    const [productDetails, setProductDetails] = useState([]);
    //items in cart variable and setter function
    const [itemsInCart, setItemsInCart] = useState(0);

    //get product details
    async function getProductDetails() {
        try {
            //communicate with /products/:id endpoint to get product details
            const getProductDetails = await fetch(`/products/${id}`, {
                method: 'GET'
            });
            //process the response
            const productDetails = getProductDetails.json();
            //return product details
            return productDetails;
        } catch(err) {
            toast.error('An error occurred while retrieving details for this product.  Try refreshing this page.');
        }
    }

    //variable to ensure the product details are only requested once
    const requestsSent = useRef({
        getProductDetails: 0
    });

    //page load logic
    useEffect(() => {
        //scroll the header into view
        document.getElementById("header").scrollIntoView();
        //get the details for this particular product if they haven't already been retrieved
        if(requestsSent.current.getProductDetails === 0) {
            getProductDetails().then(productDetails => setProductDetails(productDetails));
            requestsSent.current.getProductDetails += 1;
        }
    }, []);

    //page load logic
    useEffect(() => {
        //set isAuthenticated to false if no json web token is found in localStorage
        if(!localStorage.getItem('token')) {
            setIsAuthenticated(false);
        }
        //obtain the number of items in the authenticated customer's cart
        if(isAuthenticated) {
            getNumItems().then(itemsInCart => setItemsInCart(itemsInCart));
        }
        //re-run this logic when the itemsInCart variable changes
    }, [itemsInCart]);

    //define <Product /> presentation
    return (
        <div className={styles.bodyStyles}>
            <Header navButtons={['Login', 'Register', 'Dashboard', 'Products']} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <ProductsHeader isAuthenticated={isAuthenticated} h1Text={productDetails.item_name} itemsInCart={itemsInCart} />
            <div className={styles.productImage}>
                <figure className={styles.productFigStyles}>
                    <img className={styles.productFigImgStyles} src={productDetails.image_url} alt='Martian photo' />
                    <figcaption className={styles.productFigFigcaptionStyles}>
                        <span className={styles.productFigSpanStyles}>{productDetails.item_description}.</span>
                    </figcaption>
                </figure>
            </div>
            { isAuthenticated && <AddToCart productDetails={productDetails} id={id} setItemsInCart={setItemsInCart} itemsInCart={itemsInCart} />}
            <Footer />
        </div>
    )
};

//export the <Product /> page
export default Product;