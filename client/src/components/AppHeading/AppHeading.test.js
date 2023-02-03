//testing library setup
import { render, screen } from '@testing-library/react';
//enable usage of 'toHaveStyle()' matcher
import '@testing-library/jest-dom/extend-expect';
//React setup
import React from 'react';
//AppHeading component
import AppHeading from './AppHeading';
//styling
import mockStyles from './mockStyles.js';

describe("The <AppHeading /> component", () => {
    beforeEach(() => {
        render(<AppHeading />);
    });
    it("has a className of 'appHeading'", () => {
        const headingElement = screen.getByTestId("appHeading");
        expect(headingElement.getAttribute("class")).toEqual("appHeading");
    });
    it("has a black background", () => {
        const headingElement = screen.getByTestId("appHeading");
        headingElement.style.cssText = mockStyles;
        expect(headingElement.style.backgroundColor).toEqual("black");
    });
    it("has white, centrally-aligned text", () => {
        const headingElement = screen.getByTestId("appHeading");
        headingElement.style.cssText = mockStyles;
        expect(headingElement.style.color).toBe("white");
        expect(headingElement).toHaveStyle("text-align: center");
    });
    it("has a font size of 36px", () => {
        const headingElement = screen.getByTestId("appHeading");
        headingElement.style.cssText = mockStyles;
        expect(headingElement.style.fontSize).toBe("36px");
    });
    it("has a font family of 'ZCOOL QingKe HuangYou'", () => {
        const headingElement = screen.getByTestId("appHeading");
        headingElement.style.cssText = mockStyles;
        expect(headingElement).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
    });
    it("has a width of 99%", () => {
        const headingElement = screen.getByTestId("appHeading");
        headingElement.style.cssText = mockStyles;
        expect(headingElement).toHaveStyle("width: 99%");
    });
    it("has a border radius of 3px", () => {
        const headingElement = screen.getByTestId("appHeading");
        headingElement.style.cssText = mockStyles;
        expect(headingElement).toHaveStyle("border-radius: 3px");
    });
});