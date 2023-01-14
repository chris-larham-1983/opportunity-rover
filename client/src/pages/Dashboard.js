//React setup
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
//styling
import styles from '../styling/styling.module.css';
//components
import Header from '../components/Header';
import DashboardHeader from '../components/DashboardHeader';
import OrderHistoryItem from '../components/OrderHistoryItem';
import Address from '../components/Address';
import EditWishlist from "../components/EditWishlist";
import Footer from '../components/Footer';
//functions
import getNumItems from '../reusable_functions/getNumItems';
import getOrderHistory from '../reusable_functions/getOrderHistory';
import getAddress from '../reusable_functions/getAddress';

//pass in props to manage the authentication status
const Dashboard = ({ setIsAuthenticated, isAuthenticated }) => {

    //variables and setter functions
    const [name, setName] = useState("");
    const [itemsInCart, setItemsInCart] = useState(0);
    const [orderHistory, setOrderHistory] = useState([]);
    const [address, setAddress] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [description, setDescription] = useState("");
    const [showOrderHistory, setShowOrderHistory] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
    const [showWishlist, setShowWishlist] = useState(false);

    //variable used to control the amount of unnecessary requests sent
    const requestsSent = useRef({
        getName: 0,
        getNumItems: 0,
        getOrderHistory: 0,
    });

    //logic to set the name in the dashboard <h2> element
    async function getName() {
        try {
            //hit the /dashboard endpoint to obtain the customer name
            const getUserName = await fetch("/dashboard", {
                method: "GET",
                headers: {
                    "token": localStorage.getItem("token")
                }
            });
            //process the response
            const userName = await getUserName.json();
            //if the username has been returned, invoke the setName function appropriately
            if(userName.username) {
                setName(userName.username);
            }
            //return what will be either a genuine customer name or undefined
            return userName.username;
        } catch(err) {
            //inform the customer if an error occurs
            toast.error('An error occurred while trying to obtain your dashboard details.');
        }
    }

    //function to toggle order history display
    const toggleOrderHistory = () => {
        if(showOrderHistory) {
            setShowOrderHistory(false);
        } else {
            setShowOrderHistory(true);
            document.getElementById("toggleOrderButton").scrollIntoView();
        }
    };

    //function to toggle address display
    const toggleAddress = () => {
        if(showAddress) {
            setShowAddress(false);
        } else {
            setShowAddress(true);
            document.getElementById("toggleAddressButton").scrollIntoView();
        }
    };

    //function to toggle wishlist display
    const toggleWishlist = () => {
        if(showWishlist) {
            setShowWishlist(false);
        } else {
            setShowWishlist(true);
            document.getElementById("toggleWishlistButton").scrollIntoView();
        }
    };

    //logic for page load
    useEffect(() => {
        //in the scenario when the user has opened multiple tabs relating to this app, and then logged out of one of them:
        //1. check localStorage for 'token' 2. set isAuthenticated to false if no token is present
        if(!localStorage.getItem('token')) {
            setIsAuthenticated(false);
        }
        //ensure that getName() is called only once
        if(requestsSent.current.getName === 0) {
            getName().then(name => getWishlist(name));
            requestsSent.current.getName += 1;
        }
        //ensure that getNumItems() is called only once
        if(requestsSent.current.getNumItems === 0) {
            getNumItems().then(numItems => setItemsInCart(numItems));
            requestsSent.current.getNumItems += 1;
        }
        //ensure that getOrderHistory() is called only once
        if(requestsSent.current.getOrderHistory === 0) {
            getOrderHistory().then(orderHistory => setOrderHistory(orderHistory));
            requestsSent.current.getOrderHistory += 1;
        }
        //getAddress() gets called whenever the showAddress variable changes, so that
        //the correct details are shown if a customer updates their address,
        //then hides the address, then toggles it back into display
        getAddress().then(address => setAddress(address));
    }, [showAddress]);

    //logic for adding a wishlist item
    const onSubmitForm = async e => {
        e.preventDefault();
        //test the presence of a viable description
        if(description.trim().length > 1) {
            try {
                //define the request body
                const body = { description };
                //send the wishlist description to the /wishlist endpoint
                const addToWishlist = await fetch('/wishlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'user_name': name
                    },
                    body: JSON.stringify(body)
                });
                //update the displayed wishlist
                await getWishlist(name);
            } catch(err) {
                //notify customer if error occurs
                toast.error('An error occurred while attempting to add to wishlist!');
            }
        }
    }

    //logic for retrieving all wishlist items
    async function getWishlist(name) {
        try {
            //communicate with the /wishlist endpoint in order to get customer's wishlist
            const getWishlist = await fetch("/wishlist", {
                method: "GET",
                headers: {
                    'user_name': name
                }
            });
            //process the response
            const wishlist = await getWishlist.json();
            //set the customer's wishlist
            setWishlist(wishlist);
        } catch(err) {
            //notify customer if error occurs
            toast.error('An error occurred while attempting to retrieve your wishlist.');
        }
    }

    //logic for deleting a wishlist item
    async function deleteWishlistItem(id) {
        try {
            //communicate with the /wishlist/:id endpoint in order to delete a wishlist item
            const deleteWishlistItem = await fetch(`/wishlist/${id}`, {
                method: 'DELETE'
            });
            //update the customer's on-screen wishlist
            setWishlist(wishlist.filter(wishlistItem => wishlistItem.wishlist_id !== id));
        } catch(err) {
            //notify customer if error occurs
            toast.error('An error occurred while trying to delete that wishlist item.');
        }
    }

    //define the presentation of <Dashboard />
    return (
        <div className={styles.bodyStyles}>
            <Header navButtons={['Logout', 'Shop']} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />
            <h1 className={styles.h1Styles}>
                <span className={styles.spanStylesKhaki}>Dashboard</span>
            </h1>
            <DashboardHeader h2Text={name.length > 0? `Welcome, ${name}`: `Welcome`} itemsInCart={itemsInCart} />
            <button className={styles.toggleOrderHistory} onClick={toggleOrderHistory} id="toggleOrderButton">TOGGLE ORDER HISTORY +/-</button>
            {
                showOrderHistory && orderHistory.length > 0? orderHistory.map((order, index) => (
                    <OrderHistoryItem key={index} order={order} />
                )): showOrderHistory && orderHistory.length === 0? <p className={styles.noOrderHistory}>You have no orders to display.</p>: <p></p>
            }
            <button className={styles.toggleAddress} onClick={toggleAddress} id="toggleAddressButton">TOGGLE/UPDATE ADDRESS +/-</button>
            {
                showAddress && address.map((address, index) => (
                    <Address key={index} address={address} />
                ))
            }
            <button className={styles.toggleWishlist} onClick={toggleWishlist}  id="toggleWishlistButton">TOGGLE WISHLIST +/-</button>
            {showWishlist &&
                <div>
                    <h3 className='text-center my-5'>&darr; Add To Wishlist Manually (can also be done on the individual product pages) &darr;</h3>
                    <form className='d-flex' onSubmit={onSubmitForm}>
                        <input
                            type='text'
                            placeholder='wishlist item'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className={`form-control ${styles.inputStyles}`}
                            maxLength="255"
                        />
                        <button className={`btn btn-success ${styles.addButton}`}>Add</button>
                    </form>
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th className={styles.thStyles}>Wishlist Item</th>
                                <th className={styles.thStyles}>Edit</th>
                                <th className={styles.thStyles}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            wishlist.map(wishlistItem => (
                                <tr key={wishlistItem.wishlist_id}>
                                    <td className={styles.tdStyles} id={wishlistItem.wishlist_id}>{wishlistItem.description}</td>
                                    <td>
                                        <EditWishlist name={name} getWishlist={getWishlist} wishlistItem={wishlistItem} />
                                    </td>
                                    <td>
                                        <button
                                            className={`btn btn-danger ${styles.deleteButton}`}
                                            onClick={() => deleteWishlistItem(wishlistItem.wishlist_id)}>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>}
            <Footer />
        </div>
    );
};

//export the <Dashboard /> page
export default Dashboard;
