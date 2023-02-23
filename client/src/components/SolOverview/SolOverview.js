//React setup
import React from 'react';
//styling
import styles from '../../styling/styling.module.css';

/* BITS AND BOBS FOR THE <SOLPAGE /> PAGE:
//let the variable 'widthSlider' refer to the range <input> element with an id attribute of "widthRange"
let widthSlider = document.getElementById("widthRange");
//let the variable 'heightSlider' refer to the range <input> element with an id attribute of "heightRange"
let heightSlider = document.getElementById("heightRange");

//function triggered when the User clicks the 'Fullscreen Image' button
const fullscreenImage = () => {
    //define the 'availableHeight' variable as equal to the viewport's height
    availableHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    //ensure the 'availableWidth' variable is correctly defined
    availableWidth = screen.availWidth;
    //set the height property of 'responsiveDiv' to {availableHeight}px
    responsiveDiv.height = availableHeight;
    //for the length of the 'marsSlides' NodeList Object
    for (i = 0; i < marsSlides.length; i++) {
        //if 'availableHeight' is greater than 'availableWidth'
        if(availableHeight > availableWidth) {
            //set the width property of 'responsiveDiv' to 100%
            responsiveDiv.style.width = "100%";
            //set the height of each martian image to {availableHeight}px
            marsSlides[i].height = availableHeight;
            //set the width of each martian image to 100%
            marsSlides[i].style.width = "100%";
            //update the value of the 'percentageHeight' variable to 100
            percentageHeight = 100;
            //update the value of the 'percentageWidth' variable to 100
            percentageWidth = 100;
            //set the value of the 'heightSlider' to the new 'percentageHeight' value
            heightSlider.value = percentageHeight;
            //set the 'class' attribute of the 'heightSlider' element so that the correct percentage is displayed on the slider thumb
            heightSlider.className = "_100PerCent";
            //set the value of the 'widthSlider' to the new 'percentageWidth' value
            widthSlider.value = percentageWidth;
            //set the 'class' attribute of the 'widthSlider' element so that the correct percentage is displayed on the slider thumb
            widthSlider.className = "_100PerCent";
        }
        //otherwise, if 'availableHeight' is less than - or equal to - 'availableWidth'
        else if(availableHeight <= availableWidth) {
            //set the width of 'responsiveDiv' to {availableHeight}px
            responsiveDiv.style.width = availableHeight + "px";
            //set the left margin...
            responsiveDiv.style.marginLeft = "auto";
            //..and the right margin of the 'responsiveDiv' element so that it is always centred
            responsiveDiv.style.marginRight = "auto";
            //set the height of each martian image to {availableHeight}px
            marsSlides[i].height = availableHeight;
            //set the width of each martian image to {availableHeight}px
            marsSlides[i].style.width = availableHeight + "px";
            percentageHeight = 100; //update the value of the 'percentageHeight' variable to 100
            //update the value of the 'percentageWidth' variable to the rounded integer representation of (availableHeight/availableWidth) * 100
            percentageWidth = Math.round((availableHeight/availableWidth) * 100);
            //set the value of the 'heightSlider' to the new 'percentageHeight' value
            heightSlider.value = percentageHeight;
            //set the 'class' attribute of the 'heightSlider' element so that the correct percentage is displayed on the slider thumb
            heightSlider.className = "_100PerCent";
            //set the value of the 'widthSlider' to the new 'percentageWidth' value
            widthSlider.value = percentageWidth;
            //set the 'class' attribute of the 'widthSlider' element so that the correct percentage is displayed on the slider thumb
            widthSlider.className = "_" + percentageWidth + "PerCent";
        }
    }
    //scroll the 'imageCell' <td> element into view, aligning the bottom of the element with the bottom of the viewport
    document.getElementById("imageCell").scrollIntoView(false);
};
 */

const SolOverview = ({ fullscreenImage, heading, lastSlide }) => {
    return (
        <div className={styles.marsTableRow} data-testid="marsTableRow">
            <div className={styles.marsTableHeader} data-testid="contentDiv1">
                <button className={styles.fullscreenBtn} onClick={fullscreenImage} data-testid="fullscreenBtn">Fullscreen Image</button>
                <p className={styles.centered} data-testid="fullscreenPara">Click Image to Exit Fullscreen</p>
            </div>
            <div className={`${styles.marsTableHeader} ${styles.fiftyPerCentWidth}`} data-testid="contentDiv2">
                <h1 className={`font-effect-anaglyph ${styles.martianHeading}`} data-testid="heading" id="martianHeading">{heading}</h1>
            </div>
            <div className={styles.marsTableHeader} data-testid="contentDiv3">
                <label htmlFor="slideSelector" className={`${styles.slideSelect} ${styles.centered}`} data-testid="slideSelect">Enter Slide Number</label>
                <input id="slideSelector" className={styles.slideInput} type="number" placeholder={`1 - ${lastSlide}...`} data-testid="slideInput" min="1" max={`${lastSlide}`} />
            </div>
        </div>
    )
};

export default SolOverview;