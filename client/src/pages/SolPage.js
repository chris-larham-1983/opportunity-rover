//React setup
import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
//styling
import styles from '../styling/styling.module.css';
//<SolOverview /> component
import SolOverview from "../components/SolOverview/SolOverview";
//<SolHeading /> component
import SolHeading from '../components/SolHeading/SolHeading';
//<SolSlideshow /> component
import SolSlideshow from '../components/SolSlideshow/SolSlideshow';
//<ImageEditing /> component
import ImageEditing from '../components/ImageEditing/ImageEditing';
//<CameraFilter /> component
import CameraFilter from '../components/CameraFilter/CameraFilter';
//<SolSelection /> component
import SolSelection from '../components/SolSelection/SolSelection';
//reusable functions
import getEarthDate from '../reusable_functions/getEarthDate';
import getSolCameras from '../reusable_functions/getSolCameras';
import getSolPhotos from '../reusable_functions/getSolPhotos';

const SolPage = () => {

    const { sol } = useParams();
    const [earthDate, setEarthDate] = useState(null);
    const [solPhotos, setSolPhotos] = useState(null);
    const [solCameras, setSolCameras] = useState(null);
    const [slideNumber, setSlideNumber] = useState(1);
    const [slideIndex, setSlideIndex] = useState(0);
    const [percentageHeight, setPercentageHeight] = useState(75);
    let availableHeight, availableWidth;

    const slideInput = useRef(null);
    const previousBtn = useRef(null);
    const nextBtn = useRef(null);
    const marsUrl = useRef(null);
    const marsSlide = useRef(null);
    const responsiveDiv = useRef(null);

    useEffect(() => {
        getEarthDate(sol).then(earthDate => setEarthDate(earthDate));
        getSolPhotos(sol).then(solPhotos => setSolPhotos(solPhotos));
        getSolCameras(sol).then(solCameras => setSolCameras(solCameras));
    }, [earthDate]);

    //triggered when the User clicks the 'NEXT' button
    const manualNext  = () => {
        //if 'slideIndex' is less than the length of the 'solPhotos' array minus one
        if(slideIndex < solPhotos.length - 1) {
            //update the number <input> field
            if(slideInput.current) {
                slideInput.current.value = slideNumber + 1;
            }
            //increment 'slideIndex' by one
            setSlideIndex(slideIndex + 1);
            //set 'slideNumber' to 'slideIndex' plus one
            setSlideNumber(slideIndex + 2);
        }
        //otherwise, if 'slideIndex' is NOT less than the length of the 'solPhotos' array minus one
        else {
            //update the number <input> field
            if(slideInput.current) {
                slideInput.current.value = 1;
            }
            //set 'slideIndex' to 0
            setSlideIndex(0);
            //set 'slideNumber' to 'currentIndex' plus one
            setSlideNumber(1);
        }
    };

    //triggered when the User clicks the 'PREVIOUS' button
    const manualPrevious  = () => {
        //if 'slideIndex' is greater than 0
        if(slideIndex > 0) {
            //update the number <input> field
            if(slideInput.current) {
                slideInput.current.value = slideNumber - 1;
            }
            //decrement 'slideIndex' by one
            setSlideIndex(slideIndex - 1);
            //decrement 'slideNumber' by one
            setSlideNumber(slideNumber - 1);
        }
        //otherwise, if 'slideIndex' is NOT greater than 0
        else {
            //update the number <input> field
            if(slideInput.current) {
                slideInput.current.value = solPhotos.length;
            }
            //set 'slideIndex' to one less than the length of the solPhotos array
            setSlideIndex(solPhotos.length - 1);
            //set 'slideNumber' to the length of the solPhotos array
            setSlideNumber(solPhotos.length);
        }
    };

    return (
        <div className={styles.bodyStyles}>
            {earthDate && solPhotos && solCameras &&
                <Fragment>
                    <SolOverview availableHeight={availableHeight} setPercentageHeight={setPercentageHeight} responsiveDiv={responsiveDiv} marsSlide={marsSlide} heading={`<em>Opportunity</em> Martian Sol ${sol} <em>[Earth Date ${earthDate}]</em>`} lastSlide={solPhotos.length} slideInput={slideInput} setSlideIndex={setSlideIndex} slideNumber={slideNumber} setSlideNumber={setSlideNumber} />
                    <SolHeading heading={`Slide ${slideNumber}/${solPhotos.length}: ${solPhotos[slideIndex].figcaption}`} />
                    <SolSlideshow setPercentageHeight={setPercentageHeight} availableHeight={availableHeight} availableWidth={availableWidth} previousBtn={previousBtn} nextBtn={nextBtn} marsUrl={marsUrl} marsSlide={marsSlide} responsiveDiv={responsiveDiv} url={solPhotos[slideIndex].url} alt={solPhotos[slideIndex].alt} manualNext={manualNext} manualPrevious={manualPrevious} />
                    <ImageEditing availableHeight={availableHeight} availableWidth={availableWidth} percentageHeight={percentageHeight} setPercentageHeight={setPercentageHeight} responsiveDiv={responsiveDiv} marsUrl={marsUrl} marsSlide={marsSlide} nextBtn={nextBtn} previousBtn={previousBtn} />
                    <CameraFilter sol={sol} cameras={solCameras} setSlideIndex={setSlideIndex} setSlideNumber={setSlideNumber} setSolPhotos={setSolPhotos} />
                    <SolSelection />
                </Fragment>
            }
        </div>
    )
};

export default SolPage;