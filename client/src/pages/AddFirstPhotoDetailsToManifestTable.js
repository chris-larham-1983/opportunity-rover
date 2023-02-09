//React setup
import React, { useEffect, useRef, useState } from 'react';
//styling
import styles from '../styling/styling.module.css';
//reusable functions
import getManifest from '../reusable_functions/getManifest';
import getFirstPhoto from '../reusable_functions/getFirstPhoto';

//page that adds the first photo details to the manifest table
const AddFirstPhotoDetailsToManifestTable = () => {

    //variables to store/set the failure message returned by the server in response to a request for the first photo
    const [error, setError] = useState(null);

    //references to feedback paragraphs
    const positiveFeedback = useRef(null);
    const negativeFeedback = useRef(null);

    //variable to ensure manifest is only requested once
    const manifestRequests = useRef(0);

    const updateManifestTable = async (manifest) => {
        //initializers to be updated next time round
        for(let index = 0; index < 58; index++) {
            let sol = manifest.photo_manifest.photos[index].sol;
            try {
                const firstPhotoDetails = await getFirstPhoto(sol, setError);
                //define first photo url and alt
                const firstPhotoUrl = firstPhotoDetails[0].url;
                const firstPhotoAlt = firstPhotoDetails[0].alt;
                //define request body
                const body = { firstPhotoUrl, firstPhotoAlt, sol };
                const addFirstPhotoDetails = await fetch('/manifest/addFirstPhotoDetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
                //process and display feedback
                const feedback = await addFirstPhotoDetails.json();
                positiveFeedback.current.innerHTML = `Sol ${sol} ${feedback}`;
            } catch(err) {
                //display error
                negativeFeedback.current.innerHTML += `Problem with sol ${sol}: ${err.message}.`;
            }
        }
    }

    useEffect(() => {
        if(manifestRequests.current === 0) {
            getManifest().then(manifest => updateManifestTable(manifest));
            manifestRequests.current += 1;
        }
    });

    return (
        <div className={styles.bodyStyles}>
            <p className={styles.positiveFeedback} ref={positiveFeedback}></p>
            <p className={styles.negativeFeedback} ref={negativeFeedback}></p>
        </div>
    )
};

export default AddFirstPhotoDetailsToManifestTable;
