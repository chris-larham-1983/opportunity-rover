//React setup
import React, { useEffect, useRef, useState } from 'react';
//styling
import styles from '../styling/styling.module.css';
//components
import AppHeading from '../components/AppHeading/AppHeading';
import PageTraversal from "../components/PageTraversal/PageTraversal";
import IntroPageReturn from "../components/IntroPageReturn/IntroPageReturn";
import CameraAbbreviations from "../components/CameraAbbreviations/CameraAbbreviations";
import SolLink from '../components/SolLink/SolLink';

//page that displays: a link back to the app intro page; information on the camera abbreviations used in the app; and links to all sols on which the Opportunity Rover took photos
const SolSelectPage = () => {

    //variables to store/set all the manifest details
    const [manifestDetails, setManifestDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    //function to obtain manifest details
    const getManifestDetails = async () => {
        try {
            const getManifestDetails = await fetch('/manifest/getManifestDetails', {
                method: 'GET'
            });
            const manifestDetails = await getManifestDetails.json();
            return manifestDetails;
        } catch(err) {
            setErrorMessage(`The following error occurred while loading the page: ${err.message}.  Please try refreshing the page.`);
        }
    };

    //page load logic
    useEffect(() => {
        getManifestDetails().then(manifestDetails => setManifestDetails(manifestDetails));
    }, []);

    //<SolSelectPage /> presentation
    return (
        <div className={styles.bodyStyles}>
            <AppHeading />
            <PageTraversal />
            <div className={styles.solLinkContainer}>
                <IntroPageReturn />
                <CameraAbbreviations />
                {errorMessage && <p className={styles.negativeFeedback}>{errorMessage}</p> }
                {manifestDetails && manifestDetails.map((manifestItem, index) => (
                    <SolLink key={index} sol={manifestItem.sol} earth_date={manifestItem.earth_date} total_photos={manifestItem.total_photos} cameras={manifestItem.cameras} />
                ))}
            </div>
        </div>
    )
};

export default SolSelectPage;