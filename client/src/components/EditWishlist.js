//React setup
import React, { Fragment, useState } from 'react';
//customer notification
import { toast } from 'react-toastify';
//styling
import styles from '../styling/styling.module.css';

//pass the customer name, the getWishlist() function, and the wishlistItem to the <EditWishlist /> component
const EditWishlist = ({ name, getWishlist, wishlistItem }) => {

    //function to edit the wishlist item's text
    const editText = async (id) => {
        try {
            //define a request body that represents the wishlist's text
            const body = { description };
            //update the wishlist's text
            const updateWishlistItem = await fetch(`/wishlist/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            //process the response
            const updatedItem = await updateWishlistItem.json();
            //set the innerHTML of the <li> Dashboard component that displays the current wishlist's description
            document.getElementById(id).innerHTML = updatedItem[0].description;
            //invoke the description and updatedDescription setter functions
            setDescription(updatedItem[0].description);
            setUpdatedDescription(updatedItem[0].description);
        } catch(err) {
            //notify the customer if an error occurs
            toast.error('An error occurred while trying to update the wishlist item.');
        }
    }

    //variables to ensure wishlist description is correctly updated
    const [updatedDescription, setUpdatedDescription] = useState(null);
    const [description, setDescription] = useState(wishlistItem.description);

    //define the presentation of <EditWishlist />
    return (
        <Fragment>
            <button type="button" className={`btn btn-warning ${styles.editButton}`} data-toggle="modal" data-target={`#id${wishlistItem.wishlist_id}`}>
                Edit
            </button>

            <div className="modal"
                 id={`id${wishlistItem.wishlist_id}`}
                 onClick={() => setDescription(updatedDescription || wishlistItem.description)}>
                <div className="modal-dialog">
                    <div className="modal-content">
                            <div className="modal-header">
                                <h4 className={`modal-title ${styles.h4Styles}`}>
                                    <span className={styles.spanStylesKhaki}>Edit Wishlist Item</span>
                                </h4>
                                <button type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        onClick={() => setDescription(wishlistItem.description)}
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="modal-body">
                                <input type='text'
                                       className={`form-control ${styles.inputStyles}`}
                                       value={description}
                                       onChange={e => setDescription(e.target.value) }
                                       maxLength="255"
                                />
                            </div>

                            <div className="modal-footer">
                                <button type="button"
                                        className={`btn btn-warning ${styles.editButton}`}
                                        data-dismiss="modal"
                                        onClick={() => editText(wishlistItem.wishlist_id)}>Edit</button>

                                <button type="button"
                                        className={`btn btn-danger ${styles.closeButton}`}
                                        data-dismiss="modal"
                                        onClick={() => setDescription(wishlistItem.description)}    >Close</button>
                            </div>
                        </div>
                    </div>
            </div>
        </Fragment>
    )
};

//export the <EditWishlist /> component
export default EditWishlist;