//testing library elements
import { render, screen } from '@testing-library/react';
//allow usage of 'toHaveStyle()'
import '@testing-library/jest-dom/extend-expect';
//React setup
import React from 'react';
//CameraAbbreviations component
import CameraAbbreviations from './CameraAbbreviations';
//styling
import mockStyles from './mockStyles';

describe("The <CameraAbbreviations /> component", () => {
    beforeEach(() => {
        render(<CameraAbbreviations />);
    });

    it("is a paragraph element", () => {
        const allParagraphs = document.getElementsByTagName("P");
        expect(allParagraphs.length).toEqual(1);
    });
    it("has a class attribute of 'cameraAbbreviations'", () => {
        const cameraAbbreviations = screen.getByTestId("cameraAbbreviations");
        expect(cameraAbbreviations.getAttribute("class")).toBe("cameraAbbreviations");
    });
    it("is 500px tall", () => {
        const cameraAbbreviations = screen.getByTestId("cameraAbbreviations");
        cameraAbbreviations.style.cssText = mockStyles;
        expect(cameraAbbreviations).toHaveStyle("height: 500px");
    });
    it("is 320px wide", () => {
        const cameraAbbreviations = screen.getByTestId("cameraAbbreviations");
        cameraAbbreviations.style.cssText = mockStyles;
        expect(cameraAbbreviations).toHaveStyle("width: 320px");
    });
    it("has a border-radius of 3px", () => {
        const cameraAbbreviations = screen.getByTestId("cameraAbbreviations");
        cameraAbbreviations.style.cssText = mockStyles;
        expect(cameraAbbreviations).toHaveStyle("border-radius: 3px");
    });
    it("explains the abbreviations used in the app", () => {
        const cameraAbbreviations = document.getElementsByTagName("P")[0];
        const abbreviations = cameraAbbreviations.textContent;
        expect(abbreviations.includes("Front Hazard Avoidance Camera")).toBeTruthy();
        expect(abbreviations.includes("Rear Hazard Avoidance Camera")).toBeTruthy();
        expect(abbreviations.includes("Panoramic Camera")).not.toBeFalsy();
        expect(abbreviations.includes("Navigation Camera")).not.toBeFalsy();
        expect(abbreviations.includes("Entry, Descent, and Landing Camera")).toBeTruthy();
        expect(abbreviations.includes("Miniature Thermal Emission Spectrometer")).toBeTruthy();
    });
    it("has a 2px, ridge, lightslategrey border", () => {
        const cameraAbbreviations = screen.getByTestId("cameraAbbreviations");
        cameraAbbreviations.style.cssText = mockStyles;
        expect(cameraAbbreviations).toHaveStyle("border: 2px ridge lightslategrey");
    });
    it("justifies content centrally", () => {
        const cameraAbbreviations = screen.getByTestId("cameraAbbreviations");
        cameraAbbreviations.style.cssText = mockStyles;
        expect(cameraAbbreviations).toHaveStyle("text-align: center");
    });
    it("has a 10px margin", () => {
        const cameraAbbreviations = screen.getByTestId("cameraAbbreviations");
        cameraAbbreviations.style.cssText = mockStyles;
        expect(cameraAbbreviations).toHaveStyle("margin: 10px");
    });
    it("has a background color of lightblue", () => {
        const cameraAbbreviations = screen.getByTestId("cameraAbbreviations");
        cameraAbbreviations.style.cssText = mockStyles;
        expect(cameraAbbreviations).toHaveStyle("background-color: lightblue");
    });
    it("has a font size of 22px", () => {
        const cameraAbbreviations = screen.getByTestId("cameraAbbreviations");
        cameraAbbreviations.style.cssText = mockStyles;
        expect(cameraAbbreviations).toHaveStyle("font-size: 22px");
    });
    it("has a font type of 'ZCOOL QingKe HuangYou'", () => {
        const cameraAbbreviations = screen.getByTestId("cameraAbbreviations");
        cameraAbbreviations.style.cssText = mockStyles;
        expect(cameraAbbreviations).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
    });
    it("has a bold font weight", () => {
        const cameraAbbreviations = screen.getByTestId("cameraAbbreviations");
        cameraAbbreviations.style.cssText = mockStyles;
        expect(cameraAbbreviations).toHaveStyle("font-weight: bold");
    });
    it("has 40px (top, bottom) 5px (left, right) of padding", () => {
        const cameraAbbreviations = screen.getByTestId("cameraAbbreviations");
        cameraAbbreviations.style.cssText = mockStyles;
        expect(cameraAbbreviations).toHaveStyle("padding: 40px 5px");
    });
});
