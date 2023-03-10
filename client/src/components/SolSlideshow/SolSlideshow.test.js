//React setup
import React from 'react';
import ReactDOM from 'react-dom';
//testing library setup
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//styling
import mockStyles from './mockStyles';
//<SolSlideshow /> component
import SolSlideshow from './SolSlideshow';

describe("The <SolSlideshow /> component", () => {
    beforeEach(() => {
        render(
            <div>
                <SolSlideshow manualPrevious={() => document.getElementById("testPara").innerHTML = "Previous Image"}
                              manualNext={() => document.getElementById("testPara").innerHTML = "Next Image"}
                              url={'https://mars.nasa.gov/mer/gallery/all/1/f/001/1F128285236EDN0000P1001L0M1-BR.JPG'}
                              alt={'First photo taken by the Opportunity Rover'} />
                <p id="testPara"></p>
            </div>
        )
    });

    it("consists of an outer <div>, two <button>s, and two inner <div>s", () => {
        const divElements = document.getElementsByTagName("DIV");
        const buttonElements = document.getElementsByTagName("BUTTON");
        expect(divElements.length).toBeGreaterThanOrEqual(3);
        expect(buttonElements.length).toBe(2);
    });
    describe("the outer <div>", () => {
        it("has an id attribute of 'imageCell'", () => {
            const imageCell = screen.getByTestId("imageCell");
            expect(imageCell.getAttribute("id")).toEqual("imageCell");
        });
        it("has a width value of 99%", () => {
            const imageCell = screen.getByTestId("imageCell");
            imageCell.style.cssText = mockStyles.imageCell;
            expect(imageCell).toHaveStyle("width: 99%");
        });
        it("has a margin of 5px (top, bottom) auto (left, right)", () => {
            const imageCell = screen.getByTestId("imageCell");
            imageCell.style.cssText = mockStyles.imageCell;
            expect(imageCell).toHaveStyle("margin: 5px auto");
        });
        it("has a background color of 'darkslateblue'", () => {
            const imageCell = screen.getByTestId("imageCell");
            imageCell.style.cssText = mockStyles.imageCell;
            expect(imageCell).toHaveStyle("background-color: darkslateblue");
        });
        it("is positioned relatively", () => {
            const imageCell = screen.getByTestId("imageCell");
            imageCell.style.cssText = mockStyles.imageCell;
            expect(imageCell).toHaveStyle("position: relative");
        });
        it("has a border radius of 3px", () => {
            const imageCell = screen.getByTestId("imageCell");
            imageCell.style.cssText = mockStyles.imageCell;
            expect(imageCell).toHaveStyle("border-radius: 3px");
        });
        it("has a height value that expands/contracts to fit its content", () => {
            const imageCell = screen.getByTestId("imageCell");
            imageCell.style.cssText = mockStyles.imageCell;
            expect(imageCell).toHaveStyle("height: fit-content");
        });
    });
    describe("the two <button>s", () => {
        test("have class attributes of 'previousButton' and 'nextButton'", () => {
            const previousButton = screen.getByTestId("previousButton");
            const nextButton = screen.getByTestId("nextButton");
            expect(previousButton.getAttribute("class")).toBe("previousButton");
            expect(nextButton.getAttribute("class")).toBe("nextButton");
        });
        test("are positioned absolutely", () => {
            const previousButton = screen.getByTestId("previousButton");
            previousButton.style.cssText = mockStyles.previousButton;
            expect(previousButton).toHaveStyle("position: absolute");
        });
        test("are positioned 35% from the top of the outer <div>", () => {
            const previousButton = screen.getByTestId("previousButton");
            previousButton.style.cssText = mockStyles.previousButton;
            expect(previousButton).toHaveStyle("top: 35%");
        });
        test("display a white arrow, indicating their navigational function", () => {
            const previousButton = screen.getByTestId("previousButton");
            const nextButton = screen.getByTestId("nextButton");
            expect(previousButton.innerHTML).not.toEqual(nextButton.innerHTML);
        });
        test("display the arrow centrally", () => {
            const previousButton = screen.getByTestId("previousButton");
            previousButton.style.cssText = mockStyles.previousButton;
            expect(previousButton).toHaveStyle("text-align: center");
        });
        test("have a black background color", () => {
            const previousButton = screen.getByTestId("previousButton");
            previousButton.style.cssText = mockStyles.previousButton;
            expect(previousButton).toHaveStyle("background-color: black");
        });
        test("are 20% of the width of the outer <div>", () => {
            const previousButton = screen.getByTestId("previousButton");
            previousButton.style.cssText = mockStyles.previousButton;
            expect(previousButton).toHaveStyle("width: 20%");
        });
        test("are 30% of the height of the outer <div>", () => {
            const previousButton = screen.getByTestId("previousButton");
            previousButton.style.cssText = mockStyles.previousButton;
            expect(previousButton).toHaveStyle("height: 30%");
        });
        test("have an opacity value of 0.4", () => {
            const previousButton = screen.getByTestId("previousButton");
            previousButton.style.cssText = mockStyles.previousButton;
            expect(previousButton).toHaveStyle("opacity: 0.4");
        });
        test("have a border radius of 10px", () => {
            const previousButton = screen.getByTestId("previousButton");
            previousButton.style.cssText = mockStyles.previousButton;
            expect(previousButton).toHaveStyle("border-radius: 10px");
        });
        test("are positioned 2px from the left ('previousButton') and 2px from the right ('nextButton') of the outer <div>", () => {
            const previousButton = screen.getByTestId("previousButton");
            const nextButton = screen.getByTestId("nextButton");
            previousButton.style.cssText = mockStyles.previousButton;
            nextButton.style.cssText = mockStyles.nextButton;
            expect(previousButton).toHaveStyle("left: 2px");
            expect(nextButton).toHaveStyle("right: 2px");
        });
        test("allow the User to select the previous/next image", () => {
            const previousButton = screen.getByTestId("previousButton");
            const nextButton = screen.getByTestId("nextButton");
            const testPara = document.getElementById("testPara");
            expect(testPara.textContent.length).toBe(0);
            fireEvent.click(previousButton);
            expect(testPara.textContent).toBe("Previous Image");
            fireEvent.click(nextButton);
            expect(testPara.textContent).toBe("Next Image");
        });
    });
    describe("the first inner <div>", () => {
        it("has a class attribute of 'martianUrl'", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            expect(martianUrl.getAttribute("class")).toEqual("martianUrl");
        });
        it("displays a URL in 20px font", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            martianUrl.style.cssText = mockStyles.martianUrl;
            expect(martianUrl).toHaveStyle("font-size: 20px");
        });
        it("is positioned absolutely", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            martianUrl.style.cssText = mockStyles.martianUrl;
            expect(martianUrl).toHaveStyle("position: absolute");
        });
        it("is positioned 20px from the bottom of the outer <div>", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            martianUrl.style.cssText = mockStyles.martianUrl;
            expect(martianUrl).toHaveStyle("bottom: 20px");
        });
        it("is 99% of the width of the outer <div>", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            martianUrl.style.cssText = mockStyles.martianUrl;
            expect(martianUrl).toHaveStyle("width: 99%");
        });
        it("has a border radius of 3px", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            martianUrl.style.cssText = mockStyles.martianUrl;
            expect(martianUrl).toHaveStyle("border-radius: 3px");
        });
        it("has a central text alignment", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            martianUrl.style.cssText = mockStyles.martianUrl;
            expect(martianUrl).toHaveStyle("text-align: center");
        });
        it("has a bold font weight", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            martianUrl.style.cssText = mockStyles.martianUrl;
            expect(martianUrl).toHaveStyle("font-weight: bold");
        });
        it("displays white text", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            martianUrl.style.cssText = mockStyles.martianUrl;
            expect(martianUrl).toHaveStyle("color: white");
        });
        it("has a darkslateblue background color", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            martianUrl.style.cssText = mockStyles.martianUrl;
            expect(martianUrl).toHaveStyle("background-color: darkslateblue");
        });
        it("has a 'break-all' word-break value", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            martianUrl.style.cssText = mockStyles.martianUrl;
            expect(martianUrl).toHaveStyle("word-break: break-all");
        });
        it("uses the 'ZCOOL QingKe HuangYou' font", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            martianUrl.style.cssText = mockStyles.martianUrl;
            expect(martianUrl).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
        });
        it("has a padding value of 5px", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            martianUrl.style.cssText = mockStyles.martianUrl;
            expect(martianUrl).toHaveStyle("padding: 5px");
        });
        it("is positioned 0.5% from the left of the outer <div>", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            martianUrl.style.cssText = mockStyles.martianUrl;
            expect(martianUrl).toHaveStyle("left: 0.5%");
        });
        it("enables the User to visit the URL of the original image", () => {
            const martianUrl = screen.getByTestId("martianUrl");
            const imageLink = martianUrl.getElementsByTagName("A")[0];
            expect(imageLink).not.toBeNull();
            expect(imageLink).toBeInTheDocument();
            expect(imageLink.getAttribute("href")).toBeTruthy();
            expect(imageLink.getAttribute("target")).toEqual("_blank");
        });
    });
    describe("the second inner <div>", () => {
        it("has an id attribute of 'responsiveDiv'", () => {
            const responsiveDiv = screen.getByTestId("responsiveDiv");
            expect(responsiveDiv.getAttribute("id")).toBe("responsiveDiv");
        });
        it("has a width value of 100% of the outer <div>", () => {
            const responsiveDiv = screen.getByTestId("responsiveDiv");
            responsiveDiv.style.cssText = mockStyles.responsiveDiv;
            expect(responsiveDiv).toHaveStyle("width: 100%");
        });
        it("has a border radius of 3px", () => {
            const responsiveDiv = screen.getByTestId("responsiveDiv");
            responsiveDiv.style.cssText = mockStyles.responsiveDiv;
            expect(responsiveDiv).toHaveStyle("border-radius: 3px");
        });
        it("displays a martian image", () => {
            const responsiveDiv = screen.getByTestId("responsiveDiv");
            const martianImage = ReactDOM.findDOMNode(responsiveDiv).getElementsByTagName("IMG")[0];
            expect(martianImage).not.toBeNull();
            expect(martianImage).toBeInTheDocument();
        });
        describe("the martian image", () => {
            it("has a class attribute of 'mars2'", () => {
                const mars2 = screen.getByTestId("mars2");
                expect(mars2.getAttribute("class")).toEqual("mars2");
            });
            it("has a width attribute of 100%", () => {
                const mars2 = screen.getByTestId("mars2");
                mars2.style.cssText = mockStyles.mars2;
                expect(mars2).toHaveStyle("width: 100%");
            });
            it("has a border radius of 3px", () => {
                const mars2 = screen.getByTestId("mars2");
                mars2.style.cssText = mockStyles.mars2;
                expect(mars2).toHaveStyle("border-radius: 3px");
            });
            it("has an alt attribute", () => {
                const mars2 = screen.getByTestId("mars2");
                expect(mars2.getAttribute("alt")).toEqual("First photo taken by the Opportunity Rover");
            });
            it("has an 'src' attribute", () => {
                const mars2 = screen.getByTestId("mars2");
                expect(mars2.getAttribute("src")).toEqual("https://mars.nasa.gov/mer/gallery/all/1/f/001/1F128285236EDN0000P1001L0M1-BR.JPG");
            });
            it("enables the User to exit fullscreen mode when clicked", () => {
                const mars2 = screen.getByTestId("mars2");
                let height = window.innerHeight;
                fireEvent.click(mars2);
                //simulate the function that is triggered when the image is clicked
                let newHeight = (window.innerHeight / 100) * 75;
                expect(newHeight).toBeLessThan(height);
            });
        });
    });
});