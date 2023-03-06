//React setup
import React, { useEffect, useRef } from 'react';
//styling
import styles from '../../styling/styling.module.css';

const SolOverview = ({ availableHeight, setPercentageHeight, responsiveDiv, marsSlide, heading, lastSlide, slideInput, setSlideIndex, slideNumber, setSlideNumber }) => {
    const headingElement = useRef(null);

    const updateSlide = (e) => {
        const value = parseInt(e.target.value);
        //update the slideIndex and slideNumber values if the input number is greater than 0 and less than or equal to lastSlide
        if(value > 0 && value <= lastSlide) {
            setSlideIndex(value - 1);
            setSlideNumber(value);
            slideInput.current.value = value;
        }
    };

    const fullscreenImage = () => {
        //define the 'availableHeight' variable as equal to the viewport's height
        availableHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        //if-clause added for unit testing purposes
        if(marsSlide) {
            marsSlide.current.height = availableHeight;
            responsiveDiv.current.style.width = "100%";
            responsiveDiv.current.scrollIntoView(false);
            setPercentageHeight(100);
        }
    };

    useEffect(() => {
        headingElement.current.innerHTML = heading;
    }, [heading]);

    return (
        <div className={styles.marsTableRow} data-testid="marsTableRow">
            <div className={styles.marsTableHeader} data-testid="contentDiv1">
                <button className={styles.fullscreenBtn} onClick={fullscreenImage} data-testid="fullscreenBtn">Fullscreen Image</button>
                <p className={styles.centered} data-testid="fullscreenPara">Click Image to Exit Fullscreen</p>
            </div>
            <div className={`${styles.marsTableHeader} ${styles.fiftyPerCentWidth}`} data-testid="contentDiv2">
                <h1 className={`font-effect-anaglyph ${styles.martianHeading}`} data-testid="heading" id="martianHeading" ref={headingElement}></h1>
            </div>
            <div className={styles.marsTableHeader} data-testid="contentDiv3">
                <label htmlFor="slideSelector" className={`${styles.slideSelect} ${styles.centered}`} data-testid="slideSelect">Enter Slide Number</label>
                <input id="slideSelector" className={styles.slideInput} type="number" placeholder={`1 - ${lastSlide}...`} data-testid="slideInput" min="1" max={`${lastSlide}`} ref={slideInput} onInput={(e) => updateSlide(e)} />
            </div>
        </div>
    )
};

export default SolOverview;