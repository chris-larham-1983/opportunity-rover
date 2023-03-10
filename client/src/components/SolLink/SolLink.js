//React setup
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//styling
import styles from '../../styling/styling.module.css';

//a component that acts as a link to a specific sol on which the Opportunity Rover took photos
const SolLink = ({ sol, earth_date, total_photos, cameras, first_photo_url, first_photo_alt }) => {

    //<SolLink /> component presentation
    return (
        <div className={styles.fitContent}>
            {sol &&
                <figure id={sol.toString()} className={styles.solLink} data-testid="soLink">
                    <Link to={`/sols/${sol}`} className={styles.solRepresentative}>
                        <img className={styles.solRepresentative} src={first_photo_url} alt={first_photo_alt} />
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