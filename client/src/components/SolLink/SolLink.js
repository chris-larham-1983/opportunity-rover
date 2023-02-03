//React setup
import React, { useEffect, useRef, useState } from 'react';
//styling
import styles from '../../styling/styling.module.css';

//a component that acts a link to a specific sol on which the Opportunity Rover took photos
const SolLink = ({ sol, earth_date, total_photos, cameras }) => {

    //variables to store/set the first photo taken by the Opportunity Rover on this sol
    const [firstPhoto, setFirstPhoto] = useState(null);

    //variable to ensure that the first photo is requested only once
    const firstPhotoRequest = useRef(0);

    //variables to store/set the failure message returned by the server in response to a request for the first photo
    const [error, setError] = useState(null);

    //function to get the first photo for this sol
    const getFirstPhoto = async () => {
        try {
            const getFirstPhoto = await fetch(`/photos/${sol}/getFirstPhoto`, {
                method: 'GET'
            });
            const firstPhoto = await getFirstPhoto.json();
            return firstPhoto;
        } catch(err) {
            setError(`${err.message}`);
        }
    }

    //component load logic
    useEffect(() => {
        //ensure the first photo is requested only once
        if(firstPhotoRequest.current === 0) {
            getFirstPhoto().then(firstPhoto => setFirstPhoto(firstPhoto));
            firstPhotoRequest.current += 1;
        }
    }, []);

    return (
        <div className={styles.fitContent}>
        {firstPhoto &&
            <figure className={styles.solLink}>
                <img className={styles.solRepresentative} src={`${firstPhoto.url}`} alt={firstPhoto.alt} />
                    <p className={styles.solStats}>
                        Sol: {sol} ({earth_date})<br/>
                        Total Photos: {total_photos}<br/>
                        Cameras: {cameras}<br/>
                        <a className={styles.anchorStyles} href="#pageTraversal">^ Page Traversal ^</a>
                    </p>
            </figure>
        }
        </div>
    )
};

export default SolLink;