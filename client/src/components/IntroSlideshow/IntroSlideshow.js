//React setup
import React from 'react';
//styling
import styles from '../../styling/styling.module.css';

const IntroSlideshow = ({ photoUrls, altTexts }) => {

    return (
        <figure className={styles.slideshowFigure} data-testid="slideshowFigure">
            <div className={styles.martianUrl2} data-testid="martianUrl2">{photoUrls[0]}</div>
            { photoUrls.map((url, index) => (
                <img key={index} className={styles.mars} alt={altTexts[index]} src={photoUrls[index]} data-testid="mars" style={{ "display": "none" }} />
            ))
            }
            <figcaption className={styles.photoDescription} data-testid="photoDescription">The first photo taken by the <em>Opportunity</em> Rover</figcaption>
        </figure>
    )
}

export default IntroSlideshow;