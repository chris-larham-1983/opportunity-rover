//React setup
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
//styling
import styles from '../../styling/styling.module.css';
//getFirstPhoto function
import getFirstPhoto from '../../reusable_functions/getFirstPhoto';

//a component that acts as a link to a specific sol on which the Opportunity Rover took photos
const SolLink = ({ sol, earth_date, total_photos, cameras }) => {

    //variables to store/set the first photo taken by the Opportunity Rover on this sol
    const [firstPhoto, setFirstPhoto] = useState(null);

    //variables to store/set the failure message returned by the server in response to a request for the first photo
    const [error, setError] = useState(null);

    //component load logic
    useEffect(() => {
        getFirstPhoto(sol, setError).then(firstPhoto => setFirstPhoto(firstPhoto));
    }, []);

    //<SolLink /> component presentation
    return (
        <div className={styles.fitContent}>
            {firstPhoto &&
                <figure id={firstPhoto[0].sol.toString()} className={styles.solLink} data-testid="soLink">
                    <Link to={`/sols/${sol}`} className={styles.solRepresentative}>
                        <img className={styles.solRepresentative} src={firstPhoto[0].url} alt={firstPhoto[0].alt} />
                    </Link>
                    <p className={styles.solStats}>
                        Sol: {sol} ({earth_date})<br/>
                        Total Photos: {total_photos}<br/>
                        Cameras: {cameras}<br/>
                        <a className={styles.anchorStyles} href="#pageTraversal">^ Page Traversal ^</a>
                    </p>
                </figure>}
        </div>
    )
};

export default SolLink;