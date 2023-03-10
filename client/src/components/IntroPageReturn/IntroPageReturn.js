//React setup
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
//styling
import styles from '../../styling/styling.module.css';

//a component that acts as a link to return to the introductory page for this app
const IntroPageReturn = () => {

    //variables to store/set the random photo returned by the server
    const [randomPhoto, setRandomPhoto] = useState(null);

    //variables to store/set the failure message returned by the server in response to a request for the random photo
    const [error, setError] = useState(null);

    //variables to ensure that the first photo is only requested once
    const firstPhotoRequests = useRef(0);

    //function to get the random photo to use in this link component
    const getRandomPhoto = async () => {
        try {
            const getRandomPhoto = await fetch(`/photos/getRandomPhoto`, {
                method: 'GET'
            });
            const randomPhoto = await getRandomPhoto.json();
            //set error to null if no error has been thrown by this point in the code
            setError(null);
            return randomPhoto;
        } catch(err) {
            setError(`${err.message}`);
        }
    }

    //component load logic
    useEffect(() => {
        //if random photo details have not been requested OR an error was returned from the previous call
        if(firstPhotoRequests.current === 0 || error) {
            getRandomPhoto().then(randomPhoto => setRandomPhoto(randomPhoto));
            firstPhotoRequests.current += 1;
        }
    }, []);

    //<IntroPageReturn /> component presentation
    return (
        <div className={styles.fitContent}>
            {error && <p className={styles.negativeFeedback}>An error occurred while requesting the photo.  Try refreshing the page.</p>}
            {randomPhoto &&
                <figure className={styles.introReturn} data-testid="introReturn">
                    <Link to={`/intro`} className={styles.introReturnRepresentative}>
                        <img className={styles.introReturnRepresentative} src={randomPhoto[0].url} alt={randomPhoto[0].alt} />
                    </Link>
                    <p className={styles.introReturnMessage}>
                        <FontAwesomeIcon icon={faHandPointLeft} /> Return to Intro Page
                    </p>
                </figure>
            }
        </div>
    )
};

export default IntroPageReturn;