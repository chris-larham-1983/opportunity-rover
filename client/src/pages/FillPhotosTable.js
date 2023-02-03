//React setup
import React, { useEffect, useState, useRef } from 'react';
//styling
import styles from '../styling/styling.module.css';
//getManifest function
import getManifest from '../reusable_functions/getManifest';

//a page that populates the photos table
const FillPhotosTable = () => {
    const [manifest, setManifest] = useState(null);

    const [requests, setRequests] = useState([]);

    const manifestRequested = useRef(0);

    const positiveFeedback = useRef(null);
    const negativeFeedback = useRef(null);

    //function to formulate the approximately 8,000 requests needed to obtain all the information relating to 198,439 photos taken by the Opportunity Rover
    const formulateRequests = (manifest) => {
        setManifest(manifest);
        const photos = manifest.photo_manifest.photos;
        for(const photo of photos) {
            let sol = photo.sol;
            let total_photos = photo.total_photos;
            let pages = Math.ceil(total_photos / 25);
            for(let page = 1; page <= pages; page++) {
                let request = `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=${sol}&page=${page}&api_key=YPjczAtwJbSdpeaAxpCqWVCNbLnNAZAit5rdDI4v`;
                requests.push(request);
            }
        }
        positiveFeedback.current.innerHTML += `REQUESTS FORMULATED!<br/>
                                               Number of requests: ${requests.length}.<br/>
                                               First request: ${requests[0]}.<br/>
                                               Second request: ${requests[1]}.<br/>
                                               Third request: ${requests[2]}.<br/>
                                               Fourth request: ${requests[3]}.<br/>
                                               Fifth request: ${requests[4]}.<br/>
                                               380th request: ${requests[379]}.<br/>
                                               4000th request: ${requests[3999]}.<br/>
                                               Last request: ${requests[requests.length - 1]}.<br/><br/>`;
        setRequests(requests);
    };

    //function to populate the photos table with information relating to 198,439 photos
    const populatePhotosTable = async () => {
        for(let request = 379; request < requests.length; request++) {
            const sendRequest = await fetch(`${requests[request]}`, {
                method: 'GET'
            });
            const nasaResponse = await sendRequest.json();
            let photos = nasaResponse.photos;
            //update the positive feedback paragraph with details of the currently processing request
            positiveFeedback.current.innerHTML = `Processing request ${request + 1}/${requests.length}`;
            for(const photo of photos) {
                let id = photo.id;
                let sol = photo.sol;
                let earth_date = photo.earth_date;
                let camera = photo.camera.full_name;
                let url = photo.img_src;
                let alt = `Photo taken by the Opportunity Rover on ${earth_date} using its ${camera}.`;
                let figcaption = `Martian photo taken by the <em>Opportunity</em> Rover's <em>${camera}</em> on ${earth_date} (<em>Opportunity</em> expedition sol ${sol}).`;
                let body = { sol, earth_date, camera, url, alt, figcaption };
                try {
                    const populatePhotosTable = await fetch('/photos/addToPhotos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    });
                    const populatedPhotosTable = await populatePhotosTable.json();
                    //only display feedback if the server did not successfully process the request, in order to save memory
                    //no messages = no problems!
                    if(populatedPhotosTable !== 'Success!') {
                        negativeFeedback.current.innerHTML += `Problem with photo id ${id}, sol ${sol}, request ${request + 1}. (${populatedPhotosTable})<br/>`;
                    }
                } catch(err) {
                    negativeFeedback.current.innerHTML += `Problem with photo id ${id}, sol ${sol}: ${err.message}.`;
                }
            }
            //delay execution in order to stay within API usage limits
            await new Promise(resolve => setTimeout(resolve, 3750));
        }
        positiveFeedback.current.innerHTML += `<br/><br/>DONE!`;
        positiveFeedback.current.scrollIntoView(false);
    }

    //page load logic
    useEffect(() => {
        if(manifestRequested.current === 0) {
            getManifest().then(manifest => formulateRequests(manifest));
            manifestRequested.current += 1;
        }
    }, []);

    //<FillPhotosTable /> page presentation
    return (
        <div className={styles.bodyStyles}>
            <button className={styles.roverButton}
                    onClick={async () => { await populatePhotosTable(); }} >
                POPULATE PHOTOS TABLE
            </button>
            <p ref={positiveFeedback} className={styles.positiveFeedback}>
                SUCCESS FEEDBACK: <br/><br/>
            </p>
            <p ref={negativeFeedback} className={styles.negativeFeedback}>
                ERROR FEEDBACK: <br/><br/>
            </p>
        </div>
    )
};

export default FillPhotosTable;