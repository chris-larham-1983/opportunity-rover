//React setup
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
//styling
import styles from '../styling/styling.module.css';
//components
import Audio from '../components/Audio/Audio';
import AppHeading from '../components/AppHeading/AppHeading';
import MissionOverview from '../components/MissionOverview/MissionOverview';
import IntroSlideshow from '../components/IntroSlideshow/IntroSlideshow';
import PhotoAccess from '../components/PhotoAccess/PhotoAccess';
import TextCredit from '../components/TextCredit/TextCredit';
import Header from '../components/Header';
import Footer from '../components/Footer';

//pass in a prop that manages authentication status
const Login = ({ setIsAuthenticated }) => {

    //[an object that represents the user's input, a function to set the user's input]
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    //individual variables representing user input
    const { email, password } = inputs;

    //function to respond to changing user input
    const onInputChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    //function invoked when the user clicks the 'SUBMIT' button
    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            //define a body object that represents the user's email and password
            const body = { email, password };
            //communicate with the login endpoint, attempting to log in
            const loginAttempt = await fetch('/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const loginResponse = await loginAttempt.json();
            //if a json web token was included in the response, set that token in localStorage, update the isAuthenticated state to true, and notify the user of login success
            if(loginResponse.token) {
                localStorage.setItem("token", loginResponse.token);
                setIsAuthenticated(true);
                toast.success("Login success!");
            } else { //otherwise, set isAuthenticated to false and notify the user of the login failure
                setIsAuthenticated(false);
                toast.error(`Failed to log in - ${loginResponse}`);
            }
        } catch(err) { //notify the user of login failure
            toast.error(`Failed to log in.`);
        }
    };

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

    //define <Login /> page's presentation
    return (
        <div className={styles.bodyStyles}>
            <Audio />
            <AppHeading />
            <MissionOverview />
            <IntroSlideshow photoUrls={photoUrls} altTexts={altTexts} />
            <PhotoAccess />
            <TextCredit />
            <Header navButtons={['Login', 'Register', 'Dashboard', 'Products']} />
            <h1 className={`text-center my-5 ${styles.h1Styles}`}>
                <span className={styles.spanStylesKhaki}>Login</span>
            </h1>
            <p className={styles.paraStyles}>
                <span className={styles.spanStylesKhaki}>Log in to add items to your shopping cart, make purchases, and view your order history.</span>
            </p>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="email" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your email address.</span>
                </label>
                <input type="email" name="email" id="email" placeholder="email" className={`form-control my-3 ${styles.inputStyles}`} value={email} onChange={e => onInputChange(e)} required />
                <label htmlFor="password" className={styles.labelStyles}>
                    <span className={styles.spanStylesKhaki}>Enter your password.</span>
                </label>
                <input type="password" name="password" id="password" placeholder="password" className={`form-control my-3 ${styles.inputStyles}`} value={password} onChange={e => onInputChange(e)} required/>
                <button className={`btn btn-success btn-block ${styles.inputStyles}`}>Submit</button>
            </form>
            <Footer />
        </div>
    );
};

export default Login; //export <Login />