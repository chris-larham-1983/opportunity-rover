//React setup
import React, { useRef } from 'react';
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

const SolPage = () => {

    const { sol } = useParams();

    const previousBtn = useRef(null);
    const nextBtn = useRef(null);
    const marsUrl = useRef(null);
    const marsSlide = useRef(null);
    const responsiveDiv = useRef(null);

    return (
        <div className={styles.bodyStyles}>
            <SolOverview fullscreenImage={() => {}} heading="Dummy H1 Heading" lastSlide="54" />
            <SolHeading heading={`Sol ${sol} Heading: We Hope You Enjoy <em>Your</em> Stay`} />
            <SolSlideshow previousBtn={previousBtn} nextBtn={nextBtn} marsUrl={marsUrl} marsSlide={marsSlide} responsiveDiv={responsiveDiv} url="https://mars.nasa.gov/mer/gallery/all/1/f/001/1F128285236EDN0000P1001L0M1-BR.JPG" alt="First photo taken by the Opportunity Rover" departFullscreen={() => {}} createLink={() => {}} manualNext={() => {}} manualPrevious={() => {}} />
            <ImageEditing responsiveDiv={responsiveDiv} marsUrl={marsUrl} marsSlide={marsSlide} nextBtn={nextBtn} previousBtn={previousBtn} />
        </div>
    )
};

export default SolPage;