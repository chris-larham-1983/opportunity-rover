//React setup
import React, { useEffect } from 'react';
import ReactDOM from "react-dom";
//styling
import styles from '../styling/styling.module.css';
//components
import AppHeading from '../components/AppHeading/AppHeading';
import MissionOverview from '../components/MissionOverview/MissionOverview';
import IntroSlideshow from '../components/IntroSlideshow/IntroSlideshow';
import PhotoAccess from '../components/PhotoAccess/PhotoAccess';
import TextCredit from '../components/TextCredit/TextCredit';

const IntroPage = () => {

    //arrays required for slideshow
    const photoUrls = [
        "https://mars.nasa.gov/mer/gallery/all/1/f/001/1F128285236EDN0000P1001L0M1-BR.JPG",
        "https://mars.nasa.gov/mer/gallery/all/1/n/1000/1N216958451EFF76ZFP1950L0M1-BR.JPG",
        "https://mars.nasa.gov/mer/gallery/all/1/p/1390/1P251577656EFF8800P2629L4M1-BR.JPG",
        "https://mars.nasa.gov/mer/gallery/all/1/f/2000/1F305739504EFFA5DZP1212L0M1-BR.JPG",
        "https://mars.nasa.gov/mer/gallery/all/1/n/2400/1N341241615EFFATV1P1564L0M1-BR.JPG",
        "https://mars.nasa.gov/mer/gallery/all/1/p/3000/1P394509391EFFBRQ2P2143L4M1-BR.JPG",
        "https://mars.nasa.gov/mer/gallery/all/1/p/3500/1P438896235EFFC9VLP2637L4M1-BR.JPG",
        "https://mars.nasa.gov/mer/gallery/all/1/n/4000/1N483290340EFFCMUFP0795R0M1-BR.JPG",
        "https://mars.nasa.gov/mer/gallery/all/1/f/4500/1F527682929EFFCT00P1211L0M1-BR.JPG",
        "https://mars.nasa.gov/mer/gallery/all/1/p/5111/1P581919922EFFD2FCP2682L8M1-BR.JPG"
    ];
    const altTexts = [
        "First photo taken by the Opportunity Rover",
        "Photo taken by the Opportunity Rover on Opportunity Martian Sol 1000 [2006-11-17]",
        "Photo taken by the Opportunity Rover on Opportunity Martian Sol 1390 [2007-12-23]",
        "Photo taken by the Opportunity Rover on Opportunity Martian Sol 2000 [2009-09-09]",
        "Photo taken by the Opportunity Rover on Opportunity Martian Sol 2400 [2010-10-25]",
        "Photo taken by the Opportunity Rover on Opportunity Martian Sol 3000 [2012-07-03]",
        "Photo taken by the Opportunity Rover on Opportunity Martian Sol 3500 [2013-11-29]",
        "Photo taken by the Opportunity Rover on Opportunity Martian Sol 4000 [2015-04-26]",
        "Photo taken by the Opportunity Rover on Opportunity Martian Sol 4500 [2016-09-21]",
        "Last photo taken by the Opportunity Rover on Opportunity Martian Sol 5111 [2018-06-11]"
    ];
    const imgDescriptions = [
        "The first photo taken by the <em>Opportunity</em> Rover",
        "Photo taken by the <em>Opportunity</em> Rover on <em>Opportunity</em> Martian Sol 1000 [2006-11-17]",
        "Photo taken by the <em>Opportunity</em> Rover on <em>Opportunity</em> Martian Sol 1390 [2007-12-23]",
        "Photo taken by the <em>Opportunity</em> Rover on <em>Opportunity</em> Martian Sol 2000 [2009-09-09]",
        "Photo taken by the <em>Opportunity</em> Rover on <em>Opportunity</em> Martian Sol 2400 [2010-10-25]",
        "Photo taken by the <em>Opportunity</em> Rover on <em>Opportunity</em> Martian Sol 3000 [2012-07-03]",
        "Photo taken by the <em>Opportunity</em> Rover on <em>Opportunity</em> Martian Sol 3500 [2013-11-29]",
        "Photo taken by the <em>Opportunity</em> Rover on <em>Opportunity</em> Martian Sol 4000 [2015-04-26]",
        "Photo taken by the <em>Opportunity</em> Rover on <em>Opportunity</em> Martian Sol 4500 [2016-09-21]",
        "Last photo taken by the <em>Opportunity</em> Rover on <em>Opportunity</em> Martian Sol 5111 [2018-06-11]"
    ];

    //variables for slideshow
    let slide;
    let marsPhoto;
    let martianUrl2;
    let photoDescription;

    const initializeSlide = () => {
        slide = 0;
        return slide;
    }

    const initializePhoto = async () => {
        //reference the figure element
        const figure = document.getElementsByTagName("FIGURE")[0];
        //define an HTMLCollection of <img>s that display the martian photos
        marsPhoto = ReactDOM.findDOMNode(figure).getElementsByTagName('IMG');
        return marsPhoto[0];
    };

    const initializeUrl = async () => {
        //reference the figure element
        const figure = document.getElementsByTagName("FIGURE")[0];
        //define an HTMLCollection of <div>s that display the martian photo URL
        martianUrl2 = ReactDOM.findDOMNode(figure).getElementsByTagName('DIV');
        return martianUrl2[0];
    }

    const initializeFigcaption = async () => {
        //reference the figure element
        const figure = document.getElementsByTagName("FIGURE")[0];
        //reference the figcaption element
        photoDescription = ReactDOM.findDOMNode(figure).getElementsByTagName("FIGCAPTION");
        return photoDescription[0];
    };

    //slideshow function
    const martianSlideshow = slide => {
        if(slide === photoUrls.length) {
            slide = 0;
        }
        //hide all martian photos
        for(let index = 0; index < photoUrls.length; index++) {
            marsPhoto[index].style.display = "none";
        }
        //display the relevant photo
        marsPhoto[slide].style.display = "block";
        //update the photo URL
        martianUrl2[0].innerHTML = photoUrls[slide];
        //update the photo description
        photoDescription[0].innerHTML = imgDescriptions[slide];
        //continue with slideshow after a 2-second delay
        setTimeout(() => {
            slide++;
            martianSlideshow(slide);
        }, 2000);
    };

    //page load logic
    useEffect(() => {
        //define slide as 0
        initializeSlide();
        //define the first <img> element, then set its display attribute to 'block'
        initializePhoto().then(returnedElement => {
            returnedElement.style.display = "block";
        });
        //define the <div> element that displays the photo URL, then set its URL display appropriately
        initializeUrl().then(returnedElement => {
            returnedElement.innerHTML = photoUrls[slide];
        });
        //define the <figcaption> element that describes the photo, then set its descriptive text
        initializeFigcaption().then(caption => caption.innerHTML = imgDescriptions[slide]);
        //initiate a slideshow after a 2-second pause
        setTimeout(() => {
            slide++;
            martianSlideshow(slide);
        }, 2000);
    }, []);

    //<IntroPage /> presentation
    return (
        <div className={styles.bodyStyles}>
            <AppHeading />
            <MissionOverview />
            <IntroSlideshow photoUrls={photoUrls} altTexts={altTexts} />
            <PhotoAccess />
            <TextCredit />
        </div>
    )
};

export default IntroPage;