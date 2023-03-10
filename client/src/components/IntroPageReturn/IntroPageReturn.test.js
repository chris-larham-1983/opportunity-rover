//testing library elements
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//React setup
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
//styling
import mockStyles from './mockStyles';
import styles from '../../styling/styling.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-solid-svg-icons";

describe("The <IntroPageReturn /> element", () => {
    beforeEach(() => {
        //define a random photo number between 1 and 8770 (this is generated server-side in photos.js)
        const randomPhotoNumber = Math.floor(Math.random() * 8770) + 1;
        //define a string based on the random photo number
        const randomPhotoString = `Photo number ${randomPhotoNumber}`;
        //render a loaded version of the <IntroPageReturn /> element
        render(
            <Router>
                <figure className={styles.introReturn} data-testid="introReturn">
                    <Link to={`/intro`} className={styles.introReturnRepresentative}>
                        <img className={styles.introReturnRepresentative} src={randomPhotoNumber.toString()} alt={randomPhotoString}  data-testid="introPageReturn" />
                    </Link>
                    <p className={styles.introReturnMessage} data-testid="descriptivePara">
                        <FontAwesomeIcon icon={faHandPointLeft} /> Return to Intro Page
                    </p>
                </figure>
            </Router>
        )
    });
    it("is a <figure> element", () => {
        const introPageReturn = document.getElementsByTagName("FIGURE")[0];
        expect(introPageReturn).not.toBeNull();
        expect(introPageReturn).toBeInTheDocument();
    });
    it("displays a random photo out of the first 8770 photos taken by the Opportunity Rover", () => {
        const introReturn = screen.getByTestId("introReturn");
        const randomPhoto = ReactDOM.findDOMNode(introReturn).getElementsByTagName("IMG")[0];
        expect(randomPhoto).not.toBeNull();
        expect(randomPhoto).toBeInTheDocument();
        expect(parseInt(randomPhoto.getAttribute("src"))).toBeGreaterThanOrEqual(1);
        expect(parseInt(randomPhoto.getAttribute("src"))).toBeLessThanOrEqual(8770);
    });
    it("uses the random photo as a link back to the intro page", () => {
        const introPageReturn = screen.getByTestId("introPageReturn");
        expect(window.location.href.includes("intro")).toBeFalsy();
        fireEvent.click(introPageReturn);
        expect(window.location.href.includes("intro")).toBeTruthy();
    });
    it("includes a paragraph that informs the User of the image's navigational purpose", () => {
        const introReturn = screen.getByTestId("introReturn");
        const descriptivePara = ReactDOM.findDOMNode(introReturn).getElementsByTagName("P")[0];
        expect(descriptivePara).not.toBeNull();
        expect(descriptivePara).toBeInTheDocument();
        expect(descriptivePara.textContent).toEqual(" Return to Intro Page");
    });
    describe("the informative paragraph", () => {
        it("displays centrally-aligned text", () => {
            const descriptivePara = screen.getByTestId("descriptivePara");
            descriptivePara.style.cssText = mockStyles;
            expect(descriptivePara).toHaveStyle("text-align: center");
        });
        it("uses a 22px font size", () => {
            const descriptivePara = screen.getByTestId("descriptivePara");
            descriptivePara.style.cssText = mockStyles;
            expect(descriptivePara).toHaveStyle("font-size: 22px");
        });
        it("uses the 'ZCOOL QingKe HuangYou' font", () => {
            const descriptivePara = screen.getByTestId("descriptivePara");
            descriptivePara.style.cssText = mockStyles;
            expect(descriptivePara).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
        });
        it("has a bold font weight", () => {
            const descriptivePara = screen.getByTestId("descriptivePara");
            descriptivePara.style.cssText = mockStyles;
            expect(descriptivePara).toHaveStyle("font-weight: bold");
        });
        it("has a border-radius property of 3px", () => {
            const descriptivePara = screen.getByTestId("descriptivePara");
            descriptivePara.style.cssText = mockStyles;
            expect(descriptivePara).toHaveStyle("border-radius: 3px");
        });
        it("uses 3px of padding", () => {
            const descriptivePara = screen.getByTestId("descriptivePara");
            descriptivePara.style.cssText = mockStyles;
            expect(descriptivePara).toHaveStyle("padding: 3px");
        });
    });
});