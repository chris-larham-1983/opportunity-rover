//testing library elements
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//React setup
import React from 'react';
//IntroSlideshow component
import IntroSlideshow from './IntroSlideshow';
//styling
import mockStyles from './mockStyles';
//photoUrls and altTexts for <IntroSlideshow /> rendering
import { photoUrls, altTexts } from './mockProps';

describe("The <IntroSlideshow /> component", () => {
    beforeEach(() => {
        render(<IntroSlideshow photoUrls={photoUrls} altTexts={altTexts} />);
    });
    it("consists of a <figure> element", () => {
        const slideshowFigure = screen.getByTestId("slideshowFigure");
        expect(slideshowFigure).not.toBeNull();
        expect(slideshowFigure).toBeInTheDocument();
    });
    describe("the <figure> element", () => {
        it("has a class attribute of 'slideshowFigure'", () => {
            const figureElement = document.getElementsByTagName("FIGURE")[0];
            expect(figureElement.getAttribute("class")).toBe("slideshowFigure");
        });
        it("has a block-level display", () => {
            const figureElement = document.getElementsByTagName("FIGURE")[0];
            figureElement.style.cssText = mockStyles.slideshowFigure;
            expect(figureElement).toHaveStyle("display: block");
        });
        it("has a relative positioning", () => {
            const figureElement = document.getElementsByTagName("FIGURE")[0];
            figureElement.style.cssText = mockStyles.slideshowFigure;
            expect(figureElement).toHaveStyle("position: relative");
        });
        it("has a 10px margin", () => {
            const figureElement = document.getElementsByTagName("FIGURE")[0];
            figureElement.style.cssText = mockStyles.slideshowFigure;
            expect(figureElement).toHaveStyle("margin: 10px");
        });
        it("contains a martian <img>", () => {
           const figureImg = screen.getAllByTestId("mars")[0];
           expect(figureImg).toBeInTheDocument();
        });
        describe("the martian <img>", () => {
            test("has a class attribute of 'mars'", () => {
                const martianImg = screen.getAllByTestId("mars")[0];
                expect(martianImg.getAttribute("class")).toEqual("mars");
            });
            test("has a width attribute of 100%", () => {
                const martianImg = screen.getAllByTestId("mars")[0];
                martianImg.style.cssText = mockStyles.mars;
                expect(martianImg).toHaveStyle("width: 100%");
            });
            test("has a height of 650px", () => {
                const martianImg = screen.getAllByTestId("mars")[0];
                martianImg.style.cssText = mockStyles.mars;
                expect(martianImg).toHaveStyle("height: 650px");
            });
        });
        it("displays the URL of the martian <img>", () => {
            const imgURL = screen.getByTestId("martianUrl2");
            const urlString = imgURL.innerHTML;
            expect(imgURL).toBeInTheDocument();
            expect(urlString.length).toBeGreaterThan(0);
        });
        describe("the <div> displaying the URL of the martian <img>", () => {
            it("has a class attribute of 'martianUrl2", () => {
                const urlDiv = screen.getByTestId("martianUrl2");
                expect(urlDiv.getAttribute("class")).toBe("martianUrl2");
            });
            it("is positioned 20px from the top of the <figure>", () => {
                const urlDiv = screen.getByTestId("martianUrl2");
                urlDiv.style.cssText = mockStyles.martianUrl2;
                expect(urlDiv).toHaveStyle("position: absolute");
                expect(urlDiv).toHaveStyle("top: 20px");
            });
            it("has a width of 100%", () => {
                const urlDiv = screen.getByTestId("martianUrl2");
                urlDiv.style.cssText = mockStyles.martianUrl2;
                expect(urlDiv).toHaveStyle("width: 100%");
            });
            it("has a background color of darkslateblue", () => {
                const urlDiv = screen.getByTestId("martianUrl2");
                urlDiv.style.cssText = mockStyles.martianUrl2;
                expect(urlDiv).toHaveStyle("background-color: darkslateblue");
            });
            it("has bold, white, centrally-aligned 20px 'ZCOOL QingKe HuangYou' text", () => {
                const urlDiv = screen.getByTestId("martianUrl2");
                urlDiv.style.cssText = mockStyles.martianUrl2;
                expect(urlDiv).toHaveStyle("font-weight: bold");
                expect(urlDiv).toHaveStyle("color: white");
                expect(urlDiv).toHaveStyle("text-align: center");
                expect(urlDiv).toHaveStyle("font-size: 20px");
                expect(urlDiv).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
            });
            it("has a word-break property of 'break-all'", () => {
                const urlDiv = screen.getByTestId("martianUrl2");
                urlDiv.style.cssText = mockStyles.martianUrl2;
                expect(urlDiv).toHaveStyle("word-break: break-all");
            });
        });
        it("displays text that describes the martian <img>", () => {
            const imgText = screen.getByTestId("photoDescription");
            const textString = imgText.innerHTML;
            expect(imgText).toBeInTheDocument();
            expect(textString.length).toBeGreaterThan(0);
        });
        describe("the <figcaption> displaying descriptive text", () => {
            it("has a class attribute of 'photoDescription'", () => {
                const photoDescription = screen.getByTestId("photoDescription");
                expect(photoDescription.getAttribute("class")).toBe("photoDescription");
            });
            it("uses a 26px 'ZCOOL QingKe HuangYou' font", () => {
                const photoDescription = screen.getByTestId("photoDescription");
                photoDescription.style.cssText = mockStyles.photoDescription;
                expect(photoDescription).toHaveStyle("font-size: 26px");
                expect(photoDescription).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
            });
            it("displays black, bold, centrally-aligned text", () => {
                const photoDescription = screen.getByTestId("photoDescription");
                photoDescription.style.cssText = mockStyles.photoDescription;
                expect(photoDescription).toHaveStyle("color: black");
                expect(photoDescription).toHaveStyle("font-weight: bold");
                expect(photoDescription).toHaveStyle("text-align: center");
            });
            it("has a coral background color", () => {
                const photoDescription = screen.getByTestId("photoDescription");
                photoDescription.style.cssText = mockStyles.photoDescription;
                expect(photoDescription).toHaveStyle("background-color: coral");
            });
        });
    });
});