//React setup
import React from 'react';
import { Link } from 'react-router-dom';
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
//styling
import styles from '../../styling/styling.module.css';

const PhotoAccess = () => {
    return (
        <Link className={styles.roverButton} to={'/solSelect'} data-testid="roverButton">
            <FontAwesomeIcon icon={faHandPointRight} /> ACCESS ALL 198,439 <em>OPPORTUNITY</em> ROVER PHOTOS
        </Link>
    )
};

export default PhotoAccess;