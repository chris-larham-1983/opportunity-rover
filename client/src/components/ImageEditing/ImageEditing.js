//React setup
import React, { useEffect, useRef, useState } from 'react';
//styling
import styles from '../../styling/styling.module.css';
import './sliders.css';
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles, faHandPointRight } from '@fortawesome/free-solid-svg-icons';

const ImageEditing = ({ responsiveDiv, marsSlide, marsUrl, previousBtn, nextBtn }) => {
    /*
        component variables, setters, and default values
     */
    const [percentageWidth, setPercentageWidth] = useState(100);
    const [percentageHeight, setPercentageHeight] = useState(75);
    const [blurValue, setBlurValue] = useState(0);
    const [brightnessValue, setBrightnessValue] = useState(100);
    const [contrastValue, setContrastValue] = useState(100);
    const [invertValue, setInvertValue] = useState(0);
    const [opacityValue, setOpacityValue] = useState(100);
    const [sepiaValue, setSepiaValue] = useState(0);
    let availableHeight, availableWidth;
    /* ---------------------------------------------------------------------------------------------------------------
        logic to show/hide the image editing <div> and scroll it into view when clicked
     */
    const editingDiv = useRef(null);
    const [showEditingDiv, setShowEditingDiv] = useState(false);
    let editingDivScrollTimer;

    const toggleEditingDiv = () => {
        if(showEditingDiv) {
            setShowEditingDiv(false);
        } else {
            setShowEditingDiv(true);
            editingDivScrollTimer = setTimeout(() => {
                editingDiv.current.scrollIntoView();
            }, 125);
        }
    };
    /* ---------------------------------------------------------------------------------------------------------------
        logic to show/hide the image width editing controls
     */
    const widthSlider = useRef(null);
    const [showWidthDiv, setShowWidthDiv] = useState(false);
    const toggleWidthDiv = () => {
        if(showWidthDiv) {
            setShowWidthDiv(false);
        } else {
            setShowWidthDiv(true);
        }
    };
    /* ---------------------------------------------------------------------------------------------------------------
        logic to show/hide the image height editing controls
     */
    const heightSlider = useRef(null);
    const [showHeightDiv, setShowHeightDiv] = useState(false);
    const toggleHeightDiv = () => {
        if(showHeightDiv) {
            setShowHeightDiv(false);
        } else {
            setShowHeightDiv(true);
        }
    };
    /* ---------------------------------------------------------------------------------------------------------------
        logic to show/hide the image blur editing controls
     */
    const blurSlider = useRef(null);
    const [showBlurDiv, setShowBlurDiv] = useState(false);
    const toggleBlurDiv = () => {
        if(showBlurDiv) {
            setShowBlurDiv(false);
        } else {
            setShowBlurDiv(true);
        }
    };
    /* ---------------------------------------------------------------------------------------------------------------
        logic to show/hide the image brightness editing controls
     */
    const brightnessSlider = useRef(null);
    const [showBrightnessDiv, setShowBrightnessDiv] = useState(false);
    const toggleBrightnessDiv = () => {
        if(showBrightnessDiv) {
            setShowBrightnessDiv(false);
        } else {
            setShowBrightnessDiv(true);
        }
    };
    /* ---------------------------------------------------------------------------------------------------------------
        logic to show/hide the image contrast editing controls
     */
    const contrastSlider = useRef(null);
    const [showContrastDiv, setShowContrastDiv] = useState(false);
    const toggleContrastDiv = () => {
        if(showContrastDiv) {
            setShowContrastDiv(false);
        } else {
            setShowContrastDiv(true);
        }
    };
    /* ---------------------------------------------------------------------------------------------------------------
        logic to show/hide the image colour inversion editing controls
     */
    const invertSlider = useRef(null);
    const [showInvertDiv, setShowInvertDiv] = useState(false);
    const toggleInvertDiv = () => {
        if(showInvertDiv) {
            setShowInvertDiv(false);
        } else {
            setShowInvertDiv(true);
        }
    };
    /* ---------------------------------------------------------------------------------------------------------------
        logic to show/hide the image opacity editing controls
     */
    const opacitySlider = useRef(null);
    const [showOpacityDiv, setShowOpacityDiv] = useState(false);
    const toggleOpacityDiv = () => {
        if(showOpacityDiv) {
            setShowOpacityDiv(false);
        } else {
            setShowOpacityDiv(true);
        }
    };
    /* ---------------------------------------------------------------------------------------------------------------
        logic to show/hide the image sepia editing controls
     */
    const sepiaSlider = useRef(null);
    const [showSepiaDiv, setShowSepiaDiv] = useState(false);
    const toggleSepiaDiv = () => {
        if(showSepiaDiv) {
            setShowSepiaDiv(false);
        } else {
            setShowSepiaDiv(true);
        }
    };
    /* ---------------------------------------------------------------------------------------------------------------
        Functions to update the width of the martian image when:
            1. the width slider is dragged
            2. the '+' <button> is clicked
            3. the '-' <button> is clicked
     */
    const updateWidth = (e) => {
        const value = e.target.value;
        setPercentageWidth(value);
    };
    const increaseWidth = () => {
        //if the 'percentageWidth' is less than 100
        if(percentageWidth < 100) {
            //increase the value attribute of the 'widthSlider' element by 1
            widthSlider.value = percentageWidth + 1;
            setPercentageWidth(Number(percentageWidth) + 1);
        }
    };
    const decreaseWidth = () => {
        //if the 'percentageWidth' is greater than 1
        if(percentageWidth > 1) {
            //decrease the value of the 'widthSlider' element by 1
            widthSlider.value = percentageWidth - 1;
            setPercentageWidth(Number(percentageWidth) - 1);
        }
    };
    /* ---------------------------------------------------------------------------------------------------------------
        Functions to edit the image height when:
            1. the height slider is dragged
            2. the height increase <button> is clicked
            3. the height decrease <button> is clicked
     */
    const updateHeight = (e) => {
        const value = e.target.value;
        setPercentageHeight(value);
    };
    const increaseHeight = () => {
        //if the 'percentageHeight' is less than 100
        if(percentageHeight < 100) {
            //increase the value attribute of the 'heightSlider' element by 1
            heightSlider.value = percentageHeight + 1;
            setPercentageHeight(Number(percentageHeight) + 1);
        }
    };
    const decreaseHeight = () => {
        //if the 'percentageHeight' is greater than 1
        if(percentageHeight > 1) {
            //decrease the value of the 'heightSlider' element by 1
            heightSlider.value = percentageHeight - 1;
            setPercentageHeight(Number(percentageHeight) - 1);
        }
    };
    /* ---------------------------------------------------------------------------------------------------------------
        Functions to edit the image blur when:
            1. the blur slider is dragged
            2. the blur increase <button> is clicked
            3. the blur decrease <button> is clicked
     */

    const updateBlur = (e) => {
        const value = e.target.value;
        setBlurValue(value);
    }

    const increaseBlur = () => {
        //if the 'blurValue' is less than 100
        if(blurValue < 100) {
            //increase the value attribute of the 'blurSlider' element by 1
            blurSlider.value = blurValue + 1;
            setBlurValue(Number(blurValue) + 1);
        }
    };
    const decreaseBlur = () => {
        //if the 'blurValue' is greater than 0
        if(blurValue > 0) {
            //decrease the value of the 'blurSlider' element by 1
            blurSlider.value = blurValue - 1;
            setBlurValue(Number(blurValue) - 1);
        }
    };
    /* ---------------------------------------------------------------------------------------------------------------
        Functions to edit the image brightness when:
            1. the brightness slider is dragged
            2. the brightness increase <button> is clicked
            3. the brightness decrease <button> is clicked
     */
    const updateBrightness = (e) => {
        const value = e.target.value;
        setBrightnessValue(value);
    }

    const increaseBrightness = () => {
        //if the 'brightnessValue' is less than 800
        if(brightnessValue < 800) {
            //increase the value attribute of the 'brightnessSlider' element by 10
            brightnessSlider.value = brightnessValue + 10;
            setBrightnessValue(Number(brightnessValue) + 10);
        }
    };
    const decreaseBrightness = () => {
        //if the 'brightnessValue' is greater than 0
        if(brightnessValue > 0) {
            //decrease the value of the 'brightnessSlider' element by 10
            brightnessSlider.value = brightnessValue - 10;
            setBrightnessValue(Number(brightnessValue) - 10);
        }
    };

    /* ---------------------------------------------------------------------------------------------------------------
        Functions to edit the image contrast when:
            1. the contrast slider is dragged
            2. the contrast increase <button> is clicked
            3. the contrast decrease <button> is clicked
     */

    const updateContrast = (e) => {
        const value = e.target.value;
        setContrastValue(value);
    }

    const increaseContrast = () => {
        //if the 'contrastValue' is less than 200
        if(contrastValue < 200) {
            //increase the value attribute of the 'contrastSlider' element by 2
            contrastSlider.value = contrastValue + 2;
            setContrastValue(Number(contrastValue) + 2);
        }
    };
    const decreaseContrast = () => {
        //if the 'contrastValue' is greater than 0
        if(contrastValue > 0) {
            //decrease the value of the 'contrastSlider' element by 2
            contrastSlider.value = contrastValue - 2;
            setContrastValue(Number(contrastValue) - 2);
        }
    };
    /* ---------------------------------------------------------------------------------------------------------------
        Functions to edit the image colour inversion when:
            1. the invert slider is dragged
            2. the invert increase <button> is clicked
            3. the invert decrease <button> is clicked
     */

    const updateInvert = (e) => {
        const value = e.target.value;
        setInvertValue(value);
    }

    const increaseInvert = () => {
        //if the 'invertValue' is less than 100
        if(invertValue < 100) {
            //increase the value attribute of the 'invertSlider' element by 1
            invertSlider.value = invertValue + 1;
            setInvertValue(Number(invertValue) + 1);
        }
    };
    const decreaseInvert = () => {
        //if the 'invertValue' is greater than 0
        if(invertValue > 0) {
            //decrease the value of the 'invertSlider' element by 1
            invertSlider.value = invertValue - 1;
            setInvertValue(Number(invertValue) - 1);
        }
    };

    /* ---------------------------------------------------------------------------------------------------------------
        Functions to edit the image opacity when:
            1. the opacity slider is dragged
            2. the opacity increase <button> is clicked
            3. the opacity decrease <button> is clicked
     */

    const updateOpacity = (e) => {
        const value = e.target.value;
        setOpacityValue(value);
    }

    const increaseOpacity = () => {
        //if the 'opacityValue' is less than 100
        if(opacityValue < 100) {
            //increase the value attribute of the 'opacitySlider' element by 1
            opacitySlider.value = opacityValue + 1;
            setOpacityValue(Number(opacityValue) + 1);
        }
    };
    const decreaseOpacity = () => {
        //if the 'opacityValue' is greater than 0
        if(opacityValue > 0) {
            //decrease the value of the 'opacitySlider' element by 1
            opacitySlider.value = opacityValue - 1;
            setOpacityValue(Number(opacityValue) - 1);
        }
    };
    /* ---------------------------------------------------------------------------------------------------------------
        Functions to edit the image sepia when:
            1. the sepia slider is dragged
            2. the sepia increase <button> is clicked
            3. the sepia decrease <button> is clicked
     */
    const updateSepia = (e) => {
        const value = e.target.value;
        setSepiaValue(value);
    }

    const increaseSepia = () => {
        //if the 'sepiaValue' is less than 100
        if(sepiaValue < 100) {
            //increase the value attribute of the 'sepiaSlider' element by 1
            sepiaSlider.value = sepiaValue + 1;
            setSepiaValue(Number(sepiaValue) + 1);
        }
    };
    const decreaseSepia = () => {
        //if the 'sepiaValue' is greater than 0
        if(sepiaValue > 0) {
            //decrease the value of the 'sepiaSlider' element by 1
            sepiaSlider.value = sepiaValue - 1;
            setSepiaValue(Number(sepiaValue) - 1);
        }
    };
    /*
        component logic that runs when the component first renders and whenever the 'percentageWidth' || 'percentageHeight' || blurValue || brightnessValue ||
        contrastValue || invertValue || opacityValue ||sepiaValue variable changes
    */
    useEffect(() => {
        //define the 'availableHeight' variable as equal to the viewport's height
        availableHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        //define the 'availableWidth' variable as equal to the amount of horizontal space (in CSS pixels) available to the window
        availableWidth = screen.availWidth;
        //if the widthSlider is defined
        if(widthSlider.current) {
            //set its class attribute so that styling is correctly applied to the slider thumb
            widthSlider.current.setAttribute("class", `_${percentageWidth}PerCent`);
        }
        if(heightSlider.current) {
            heightSlider.current.setAttribute("class", `_${percentageHeight}PerCent`);
        }
        if(blurSlider.current) {
            blurSlider.current.setAttribute("class", `_${blurValue}Pixel`);
        }
        if(brightnessSlider.current) {
            brightnessSlider.current.setAttribute("class", `_${brightnessValue}PerCent`);
        }
        if(contrastSlider.current) {
            contrastSlider.current.setAttribute("class", `_${contrastValue}PerCent`);
        }
        if(invertSlider.current) {
            invertSlider.current.setAttribute("class", `_${invertValue}PerCent`);
        }
        if(opacitySlider.current) {
            opacitySlider.current.setAttribute("class", `_${opacityValue}PerCent`);
        }
        if(sepiaSlider.current) {
            sepiaSlider.current.setAttribute("class", `_${sepiaValue}PerCent`);
        }
        //set the width of 'responsiveDiv' to {percentageWidth}%
        responsiveDiv.current.style.width = percentageWidth + "%";
        //set the left margin...
        responsiveDiv.current.style.marginLeft = "auto";
        //...and the right margin such that 'responsiveDiv' is centred
        responsiveDiv.current.style.marginRight = "auto";
        //set the 'height' attribute of the image equal to the rounded result of ((availableHeight/100) * percentageHeight) in order to avoid height increasing/decreasing proportionate to width
        marsSlide.current.height = Math.round((availableHeight / 100) * percentageHeight);
        //add the desired blur, brightness, contrast, color inversion, opacity, and sepia effects
        marsSlide.current.style.filter = `blur(${blurValue}px) brightness(${brightnessValue}%) contrast(${contrastValue}%) invert(${invertValue}%) opacity(${opacityValue}%) sepia(${sepiaValue}%)`;
        marsSlide.current.style.WebkitFilter = `blur(${blurValue}px) brightness(${brightnessValue}%) contrast(${contrastValue}%) invert(${invertValue}%) opacity(${opacityValue}%) sepia(${sepiaValue}%)`;
        //ensure the martian url remains visible by setting its 'z-index' property to '1'
        marsUrl.current.style.zIndex = "1";
        //ensure the 'previousBtn' remains visible by setting its 'z-index' property to '1'
        previousBtn.current.style.zIndex = "1";
        //ensure the 'nextBtn' remains visible by setting its 'z-index' property to '1'
        nextBtn.current.style.zIndex = "1";
    }, [percentageWidth, percentageHeight, blurValue, brightnessValue, contrastValue, invertValue, opacityValue, sepiaValue]);

    return (
        <div className={styles.marsTableCell}>
            <h2 className={styles.controlsHeading} onClick={toggleEditingDiv}>
                <FontAwesomeIcon icon={ faHandPointRight } /> <FontAwesomeIcon icon={ faWandMagicSparkles } /> Image Editing Controls +/- [Default Values in Brackets] <FontAwesomeIcon icon={ faWandMagicSparkles } />
            </h2>
            {showEditingDiv &&
                <div className={styles.editingDiv} ref={editingDiv}>
                    <p className={styles.labelPara} onClick={toggleWidthDiv}>
                        <label htmlFor="widthRange">
                            <span className={styles.spanStylesKhaki}>&larr;</span> Width +/- <span className={styles.spanStylesKhaki}>[100%]</span> <span className={styles.spanStylesKhaki}>&rarr;</span>
                        </label>
                    </p>
                    {showWidthDiv &&
                        <div className={styles.sliderContainer}>
                            <button className={styles.decrease} onClick={decreaseWidth}>-</button>
                            <input id={styles.widthRange}
                                   ref={widthSlider}
                                   type="range"
                                   min="1"
                                   max="100"
                                   value={percentageWidth}
                                   onInput={(e) => updateWidth(e)}
                                   className={`_${percentageWidth}PerCent`} />
                            <button className={styles.increase} onClick={increaseWidth}>+</button>
                        </div>}
                    <p className={styles.labelPara} onClick={toggleHeightDiv}>
                        <label htmlFor="heightRange">
                            <span className={styles.spanStylesKhaki}>&uarr;</span> Height +/- <span className={styles.spanStylesKhaki}>[75%]</span> <span className={styles.spanStylesKhaki}>&darr;</span>
                        </label>
                    </p>
                    {showHeightDiv &&
                        <div className={styles.sliderContainer}>
                            <button className={styles.decrease} onClick={decreaseHeight}>-</button>
                            <input id={styles.heightRange}
                                   ref={heightSlider}
                                   type="range"
                                   min="1"
                                   max="100"
                                   value={percentageHeight}
                                   onInput={(e) => updateHeight(e)}
                                   className={`_${percentageHeight}PerCent`} />
                            <button className={styles.increase} onClick={increaseHeight}>+</button>
                        </div>}
                    <p className={styles.labelPara} onClick={toggleBlurDiv}>
                        <label htmlFor="blurRange">
                            <span className={styles.blur1}> Blur +/-</span> <span className={styles.spanStylesKhaki}>[0px]</span>
                        </label>
                    </p>
                    {showBlurDiv &&
                        <div className={styles.sliderContainer}>
                            <button className={styles.decrease} onClick={decreaseBlur}>-</button>
                            <input id={styles.blurRange}
                                   ref={blurSlider}
                                   type="range"
                                   min="0"
                                   max="100"
                                   value={blurValue}
                                   onInput={(e) => updateBlur(e)}
                                   className={`_${blurValue}Pixel`} />
                            <button className={styles.increase} onClick={increaseBlur}>+</button>
                        </div>}
                    <p className={styles.labelPara} onClick={toggleBrightnessDiv}>
                        <label htmlFor="brightnessRange">
                            <span className={styles.brightness200}>Bright</span><span className={styles.brightness50}>ness</span> +/- <span className={styles.spanStylesKhaki}>[100%]</span>
                        </label>
                    </p>
                    {showBrightnessDiv &&
                        <div className={styles.sliderContainer}>
                            <button className={styles.decrease} onClick={decreaseBrightness}>-</button>
                            <input id={styles.brightnessRange}
                                   ref={brightnessSlider}
                                   type="range"
                                   min="0"
                                   max="800"
                                   step="10"
                                   value={brightnessValue}
                                   onInput={(e) => updateBrightness(e)}
                                   className={`_${brightnessValue}PerCent`} />
                            <button className={styles.increase} onClick={increaseBrightness}>+</button>
                        </div>}
                    <p className={styles.labelPara} onClick={toggleContrastDiv}>
                        <label htmlFor="contrastRange">
                            <span className={styles.contrast50}>Con</span><span className={styles.contrast150}>trast</span> +/- <span className={styles.spanStylesKhaki}>[100%]</span>
                        </label>
                    </p>
                    {showContrastDiv &&
                        <div className={styles.sliderContainer}>
                            <button className={styles.decrease} onClick={decreaseContrast}>-</button>
                            <input id={styles.contrastRange}
                                   ref={contrastSlider}
                                   type="range"
                                   min="0"
                                   max="200"
                                   step="2"
                                   value={contrastValue}
                                   onInput={(e) => updateContrast(e)}
                                   className={`_${contrastValue}PerCent`} />
                            <button className={styles.increase} onClick={increaseContrast}>+</button>
                        </div>}
                    <p className={styles.labelPara} onClick={toggleInvertDiv}>
                        <label htmlFor="invertRange">
                            <span className={styles.invert100}>Invert +/-</span> <span className={styles.spanStylesKhaki}>[0%]</span>
                        </label>
                    </p>
                    {showInvertDiv &&
                        <div className={styles.sliderContainer}>
                            <button className={styles.decrease} onClick={decreaseInvert}>-</button>
                            <input id={styles.invertRange}
                                   ref={invertSlider}
                                   type="range"
                                   min="0"
                                   max="100"
                                   value={invertValue}
                                   onInput={(e) => updateInvert(e)}
                                   className={`_${invertValue}PerCent`} />
                            <button className={styles.increase} onClick={increaseInvert}>+</button>
                        </div>}
                    <p className={styles.labelPara} onClick={toggleOpacityDiv}>
                        <label htmlFor="opacityRange">
                            <span className={styles.opacity60}>Opacity +/-</span> <span className={styles.spanStylesKhaki}>[100%]</span>
                        </label>
                    </p>
                    {showOpacityDiv &&
                        <div className={styles.sliderContainer}>
                            <button className={styles.decrease} onClick={decreaseOpacity}>-</button>
                            <input id={styles.opacityRange}
                                   ref={opacitySlider}
                                   type="range"
                                   min="0"
                                   max="100"
                                   value={opacityValue}
                                   onInput={(e) => updateOpacity(e)}
                                   className={`_${opacityValue}PerCent`} />
                            <button className={styles.increase} onClick={increaseOpacity}>+</button>
                        </div>}
                    <p className={styles.labelPara} onClick={toggleSepiaDiv}>
                        <label htmlFor="sepiaRange">
                            <span className={styles.sepia100}>Sepia +/-</span> <span className={styles.spanStylesKhaki}>[0%]</span>
                        </label>
                    </p>
                    {showSepiaDiv &&
                        <div className={styles.sliderContainer}>
                            <button className={styles.decrease} onClick={decreaseSepia}>-</button>
                            <input id={styles.sepiaRange}
                                   ref={sepiaSlider}
                                   type="range"
                                   min="0"
                                   max="100"
                                   value={sepiaValue}
                                   onInput={(e) => updateSepia(e)}
                                   className={`_${sepiaValue}PerCent`} />
                            <button className={styles.increase} onClick={increaseSepia}>+</button>
                        </div>
                        }
                </div>}
        </div>
    )
};

export default ImageEditing;