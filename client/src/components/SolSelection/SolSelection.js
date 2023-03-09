//React setup
import React from 'react';
import { Link } from 'react-router-dom';
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-regular-svg-icons';
//styling
import styles from '../../styling/styling.module.css';

const SolSelection = () => {
    return (
        <Link className={styles.roverButton} to={'/solSelect'} data-testid="roverButton">
            <FontAwesomeIcon icon={faHandPointLeft} /> RETURN TO SOL SELECTION
        </Link>
    )
};

export default SolSelection;