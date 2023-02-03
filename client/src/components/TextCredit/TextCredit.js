//React setup
import React from 'react';
//styling
import styles from '../../styling/styling.module.css';

const TextCredit = () => {
    return (
        <p className={styles.textCredit} data-testid="textCredit">
            Text Credit: https://mars.nasa.gov/mer/mission/overview/
        </p>
    )
};

export default TextCredit;