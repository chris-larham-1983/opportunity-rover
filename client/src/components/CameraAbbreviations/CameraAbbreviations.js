//React setup
import React from 'react';
//styling
import styles from '../../styling/styling.module.css';

const CameraAbbreviations = () => {

    return (
        <p className={styles.cameraAbbreviations} data-testid="cameraAbbreviations">
            <span className={styles.martianRed}>Camera Abbreviations</span>:<br/><br/>
            <span className={styles.martianRed}><em>FHAZ</em></span> : <em>F</em>ront <em>Haz</em>ard Avoidance Camera<br/>
            <span className={styles.martianRed}><em>RHAZ</em></span> : <em>R</em>ear <em>Haz</em>ard Avoidance Camera<br/>
            <span className={styles.martianRed}><em>NAVCAM</em></span> : <em>Nav</em>igation <em>Cam</em>era<br/>
            <span className={styles.martianRed}><em>PANCAM</em></span> : <em>Pan</em>oramic <em>Cam</em>era<br/>
            <span className={styles.martianRed}><em>MINITES</em></span> : <em>Mini</em>ature <em>T</em>hermal <em>E</em>mission <em>S</em>pectrometer<br/>
            <span className={styles.martianRed}><em>ENTRY</em></span> : <em>Entry</em>, Descent, and Landing Camera
        </p>
    )
};

export default CameraAbbreviations;