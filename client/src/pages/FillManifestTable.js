//React setup
import React, { useEffect, useRef, useState } from 'react';
//styling
import styles from '../styling/styling.module.css';
//getManifest function
import getManifest from '../reusable_functions/getManifest';

const FillManifestTable = () => {

    const [manifest, setManifest] = useState(null);

    const manifestRequested = useRef(0);

    const positiveFeedback = useRef(null);
    const negativeFeedback = useRef(null);

    const populateManifestTable = async (manifest) => {
        setManifest(manifest);
        const photos = manifest.photo_manifest.photos;
        for(const photo of photos) {
            let sol = photo.sol;
            let earth_date = photo.earth_date;
            let total_photos = photo.total_photos;
            let camerasArray = photo.cameras;
            let cameras = camerasArray.join(", ");
            let body = {
                sol,
                earth_date,
                total_photos,
                cameras
            };
            try {
                const addToManifest = await fetch('/manifest/addToManifest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
                const addedToManifest = await addToManifest.json();
                if(addedToManifest === 'Sol statistics added successfully.') {
                    positiveFeedback.current.innerHTML += `Sol ${sol} statistics added to manifest table successfully.<br/>`;
                } else {
                    negativeFeedback.current.innerHTML += `Problem with sol ${sol}: ${addedToManifest}.<br/>`;
                }
            } catch(err) {
                negativeFeedback.current.innerHTML += `Problem with sol ${sol}: ${err.message}.<br/>`;
            }
        }
    };

    useEffect(() => {
        //ensure manifest is only requested once
        if(manifestRequested.current === 0) {
            getManifest().then(manifest => populateManifestTable(manifest));
            manifestRequested.current += 1;
        }
    }, []);

    return (
        <div className={styles.bodyStyles}>
            <p className={styles.positiveFeedback} ref={positiveFeedback}>
                SUCCESS FEEDBACK:<br/><br/>
            </p>
            <p className={styles.negativeFeedback} ref={negativeFeedback}>
                ERROR FEEDBACK:<br/><br/>
            </p>
        </div>
    )
};

export default FillManifestTable;