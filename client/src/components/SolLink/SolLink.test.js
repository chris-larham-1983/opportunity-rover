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

describe("the <SolLink /> component", () => {
    beforeEach(() => {
        //render a loaded version of the <SolLink /> component
        render(
            <Router>
                <div className={styles.fitContent}>
                    <figure id="1"
                            className={styles.solLink}
                            data-testid="solLink">
                        <Link to={`/sols/1`} className={styles.solRepresentative}>
                            <img className={styles.solRepresentative}
                                 src="http://mars.nasa.gov/mer/gallery/all/1/f/001/1F128285236EDN0000P1001L0M1-BR.JPG"
                                 alt="Photo taken by the Opportunity Rover on 2004-01-26 using its Front Hazard Avoidance Camera."
                                 data-testid="martianImage"
                            />
                        </Link>
                        <p className={styles.solStats}
                           data-testid="solStats">
                            Sol: 1 (2004-01-26)<br />
                            Total Photos: 95<br />
                            Cameras: "ENTRY", "FHAZ", "NAVCAM", "PANCAM", "RHAZ"<br />
                            <a className={styles.anchorStyles} href="#pageTraversal">^ Page Traversal ^</a>
                        </p>
                    </figure>
                </div>
            </Router>
        );
    });

    it("has a class attribute of 'solLink'", () => {
        const solLink = screen.getByTestId("solLink");
        expect(solLink.getAttribute("class")).toBe("solLink");
    });
    it("has a height of 500px", () => {
        const solLink = screen.getByTestId("solLink");
        solLink.style.cssText = mockStyles.solLink;
        expect(solLink).toHaveStyle("height: 500px");
    });
    it("has a width of 320px", () => {
        const solLink = screen.getByTestId("solLink");
        solLink.style.cssText = mockStyles.solLink;
        expect(solLink).toHaveStyle("width: 320px");
    });
    it("has a border-radius of 3px", () => {
        const solLink = screen.getByTestId("solLink");
        solLink.style.cssText = mockStyles.solLink;
        expect(solLink).toHaveStyle("border-radius: 3px");
    });
    it("has a 2px, groove, lightslategrey border", () => {
        const solLink = screen.getByTestId("solLink");
        solLink.style.cssText = mockStyles.solLink;
        expect(solLink).toHaveStyle("border: 2px groove lightslategrey");
    });
    it("has a flex display", () => {
        const solLink = screen.getByTestId("solLink");
        solLink.style.cssText = mockStyles.solLink;
        expect(solLink).toHaveStyle("display: flex");
    });
    it("has a flex-flow value of 'row wrap'", () => {
        const solLink = screen.getByTestId("solLink");
        solLink.style.cssText = mockStyles.solLink;
        expect(solLink).toHaveStyle("flex-flow: row wrap");
    });
    it("has a justify-content value of space-evenly", () => {
        const solLink = screen.getByTestId("solLink");
        solLink.style.cssText = mockStyles.solLink;
        expect(solLink).toHaveStyle("justify-content: space-evenly");
    });
    it("has an align-items value of center", () => {
        const solLink = screen.getByTestId("solLink");
        solLink.style.cssText = mockStyles.solLink;
        expect(solLink).toHaveStyle("align-items: center");
    });
    it("has a light blue background color", () => {
        const solLink = screen.getByTestId("solLink");
        solLink.style.cssText = mockStyles.solLink;
        expect(solLink).toHaveStyle("background-color: lightblue");
    });
    it("includes a martian <img>", () => {
        const solLink = screen.getByTestId("solLink");
        const martianImage = ReactDOM.findDOMNode(solLink).getElementsByTagName("IMG")[0];
        expect(martianImage).not.toBeNull();
        expect(martianImage).toBeInTheDocument();
    });
    describe("the martian <img>", () => {
        it("has a class attribute of 'solRepresentative'", () => {
            const martianImage = screen.getByTestId("martianImage");
            expect(martianImage.getAttribute("class")).toEqual("solRepresentative");
        });
        it("has a 'src' attribute", () => {
            const martianImage = screen.getByTestId("martianImage");
            expect(martianImage.getAttribute("src")).not.toBeNull();
            expect(martianImage.getAttribute("src").length).toBeGreaterThan(1);
        });
        it("has an 'alt' attribute", () => {
            const martianImage = screen.getByTestId("martianImage");
            expect(martianImage.getAttribute("alt")).not.toBeNull();
            expect(martianImage.getAttribute("alt").length).toBeGreaterThan(1);
        });
        it("has a width of 300px", () => {
            const martianImage = screen.getByTestId("martianImage");
            martianImage.style.cssText = mockStyles.solRepresentative;
            expect(martianImage).toHaveStyle("width: 300px");
        });
        it("has a height of 300px", () => {
            const martianImage = screen.getByTestId("martianImage");
            martianImage.style.cssText = mockStyles.solRepresentative;
            expect(martianImage).toHaveStyle("height: 300px");
        });
        it("has a border radius of 3px", () => {
            const martianImage = screen.getByTestId("martianImage");
            martianImage.style.cssText = mockStyles.solRepresentative;
            expect(martianImage).toHaveStyle("border-radius: 3px");
        });
        it("expands in height and width on hover", () => {
            const martianImage = screen.getByTestId("martianImage");
            martianImage.style.cssText = mockStyles.solRepresentative;
            martianImage.addEventListener("mouseover", () => {
                martianImage.style.cssText = mockStyles.solRepresentativeHover;
            });
            expect(martianImage).not.toHaveStyle("width: 100%");
            expect(martianImage).not.toHaveStyle("height: 100%");
            expect(martianImage).not.toHaveStyle("pointer: cursor");
            fireEvent.mouseOver(martianImage);
            expect(martianImage).toHaveStyle("width: 100%");
            expect(martianImage).toHaveStyle("height: 100%");
            expect(martianImage).toHaveStyle("cursor: pointer");
        });
    });
    it("includes a statistical paragraph", () => {
        const solLink = screen.getByTestId("solLink");
        const solStats = ReactDOM.findDOMNode(solLink).getElementsByTagName("P")[0];
        expect(solStats).not.toBeNull();
        expect(solStats).toBeInTheDocument();
    });
    describe("the statistical <p>", () => {
        it("has a class attribute of 'solStats'", () => {
            const solStats = screen.getByTestId("solStats");
            expect(solStats.getAttribute("class")).toEqual("solStats");
        });
        it("has centrally-aligned text", () => {
            const solStats = screen.getByTestId("solStats");
            solStats.style.cssText = mockStyles.solStats;
            expect(solStats).toHaveStyle("text-align: center");
        });
        it("uses a 22px 'ZCOOL QingKe HuangYou' font", () => {
            const solStats = screen.getByTestId("solStats");
            solStats.style.cssText = mockStyles.solStats;
            expect(solStats).toHaveStyle("font-size: 22px");
            expect(solStats).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
        });
        it("has a border radius of 3px", () => {
            const solStats = screen.getByTestId("solStats");
            solStats.style.cssText = mockStyles.solStats;
            expect(solStats).toHaveStyle("border-radius: 3px");
        });
        it("has a padding property of 3px", () => {
            const solStats = screen.getByTestId("solStats");
            solStats.style.cssText = mockStyles.solStats;
            expect(solStats).toHaveStyle("padding: 3px");
        });
        it("details the sol and earth date of the photos to which it links", () => {
            const solStats = screen.getByTestId("solStats");
            expect(solStats.textContent.includes("Sol: 1")).toBeTruthy();
            expect(solStats.textContent.includes("2004-01-26")).toBeTruthy();
        });
        it("details the total photos available for that particular sol", () => {
            const solStats = screen.getByTestId("solStats");
            expect(solStats.textContent.includes("Total Photos: 95")).toBeTruthy();
        });
        it("lists the abbreviations of the cameras used to take the photos", () => {
            const solStats = screen.getByTestId("solStats");
            expect(solStats.textContent.includes('Cameras: "ENTRY", "FHAZ", "NAVCAM", "PANCAM", "RHAZ"')).toBeTruthy();
        });
        it("has bold font", () => {
            const solStats = screen.getByTestId("solStats");
            solStats.style.cssText = mockStyles.solStats;
            expect(solStats).toHaveStyle("font-weight: bold");
        });
        it("provides a link back to the top of the page", () => {
            const solStats = screen.getByTestId("solStats");
            const pageTopLink = ReactDOM.findDOMNode(solStats).getElementsByTagName("A")[0];
            expect(pageTopLink).not.toBeNull();
            expect(pageTopLink).toBeInTheDocument();
        });
    });
});
