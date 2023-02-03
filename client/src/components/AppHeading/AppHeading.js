//React setup
import React from 'react';
//styling
import styles from '../../styling/styling.module.css';

const AppHeading = () => {
    return (
        <div>
            <h1
                id="appHeading"
                data-testid="appHeading"
                className={styles.appHeading}
            >MARS ROVER: OPPORTUNITY</h1>
        </div>
    )
};

export default AppHeading;