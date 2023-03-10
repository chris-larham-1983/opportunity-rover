//React setup
import React, { useEffect } from 'react';
//styling
import styles from '../../styling/styling.module.css';

//an image slideshow component - the 'slideIndex' prop is necessary as it is changed by clicking the forward/backward buttons and causes the component to re-render with the new image and caption text
const SolSlideshow = ({ setPercentageHeight, availableHeight, availableWidth, manualPrevious, manualNext, url, alt, previousBtn, nextBtn, marsUrl, responsiveDiv, marsSlide, slideIndex }) => {

    //function triggered by clicking the martian image
    const departFullscreen = () => {
        //define the 'availableHeight' variable as equal to the viewport's height
        availableHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        //if-clause added for unit testing purposes
        if(marsSlide) {
            marsSlide.current.height = Math.round((availableHeight / 100) * 75);
            setPercentageHeight(75);
            responsiveDiv.current.scrollIntoView(false);
        }
    };
    //logic to render this component's image with a width of 100% and a height of 75% on first render
    useEffect(() => {
        //define the 'availableHeight' variable as equal to the viewport's height
        availableHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        //define the 'availableWidth' variable as equal to the amount of horizontal space (in CSS pixels) available to the window
        availableWidth = screen.availWidth;
        //if-clause added for unit testing purposes
        if(responsiveDiv) {
            responsiveDiv.current.style.width = "100%";
            //set the left margin...
            responsiveDiv.current.style.marginLeft = "auto";
            //...and the right margin such that 'responsiveDiv' is centred
            responsiveDiv.current.style.marginRight = "auto";
            //set the 'height' attribute of the image equal to the rounded result of ((availableHeight/100) * 75)
            marsSlide.current.height = Math.round((availableHeight / 100) * 75);
        }
    }, []);

    return (
        <div id={styles.imageCell} data-testid="imageCell">
            <button className={styles.previousButton} data-testid="previousButton" onClick={manualPrevious} ref={previousBtn}>&larr;</button>
            <button className={styles.nextButton} data-testid="nextButton" onClick={manualNext} ref={nextBtn}>&rarr;</button>
            <div className={styles.martianUrl} data-testid="martianUrl" ref={marsUrl}>
                <a href={url} target='_blank'>{url}</a>
            </div>
            <div id={styles.responsiveDiv} data-testid="responsiveDiv" ref={responsiveDiv}>
                <img className={styles.mars2} data-testid="mars2" src={url} alt={alt} onClick={departFullscreen} ref={marsSlide} />
            </div>
        </div>
    )
};

export default SolSlideshow;