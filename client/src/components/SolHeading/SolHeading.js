//React setup
import React, { useEffect, useRef } from 'react';
//styling
import styles from '../../styling/styling.module.css';

const SolHeading = ({ heading }) => {
    const photoDescription = useRef(null);

    useEffect(() => {
        photoDescription.current.innerHTML = heading;
    });

    return (
        <div className={styles.marsTableCell} data-testid="marsTableCell">
            <p className={styles.photoDescription} data-testid="photoDescription" ref={photoDescription}></p>
        </div>
    )
};

export default SolHeading;