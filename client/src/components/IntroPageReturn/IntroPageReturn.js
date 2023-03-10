//React setup
import React, { useEffect, useState } from 'react';
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

    //function to get the random photo to use in this link component
    const getRandomPhoto = async () => {
        try {
            const getRandomPhoto = await fetch(`/photos/getRandomPhoto`, {
                method: 'GET'
            });
            const randomPhoto = await getRandomPhoto.json();
            return randomPhoto;
        } catch(err) {
            setError(`${err.message}`);
        }
    }

    //component load logic
    useEffect(() => {
        getRandomPhoto().then(randomPhoto => setRandomPhoto(randomPhoto));
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