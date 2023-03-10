//testing library elements
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//React setup
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
//PhotoAccess component
import PhotoAccess from './PhotoAccess';
//styling
import mockStyles from './mockStyles';

describe("The <PhotoAccess /> component", () => {
    beforeEach(() => {
        render(
            <Router>
                <PhotoAccess />
            </Router>
        );
    });
    it("has a class attribute of 'roverButton'", () => {
        const roverButton = screen.getByTestId("roverButton");
        expect(roverButton.getAttribute("class")).toEqual("roverButton");
    });
    it("has a font-size of 30px", () => {
        const roverButton = screen.getByTestId("roverButton");
        roverButton.style.cssText = mockStyles.standard;
        expect(roverButton).toHaveStyle("font-size: 30px");
    });
    it("has a font-family of 'ZCOOL QingKe HuangYou'", () => {
        const roverButton = screen.getByTestId("roverButton");
        roverButton.style.cssText = mockStyles.standard;
        expect(roverButton).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
    });
    it("has a width of 99%", () => {
        const roverButton = screen.getByTestId("roverButton");
        roverButton.style.cssText = mockStyles.standard;
        expect(roverButton).toHaveStyle("width: 99%");
    });
    it("has a background color of 'darkslateblue'", () => {
        const roverButton = screen.getByTestId("roverButton");
        roverButton.style.cssText = mockStyles.standard;
        expect(roverButton).toHaveStyle("background-color: darkslateblue");
    });
    it("has a border radius of 3px", () => {
        const roverButton = screen.getByTestId("roverButton");
        roverButton.style.cssText = mockStyles.standard;
        expect(roverButton).toHaveStyle("border-radius: 3px");
    });
    it("displays white text", () => {
        const roverButton = screen.getByTestId("roverButton");
        roverButton.style.cssText = mockStyles.standard;
        expect(roverButton).toHaveStyle("color: white");
    });
    it("has a padding value of 10px", () => {
        const roverButton = screen.getByTestId("roverButton");
        roverButton.style.cssText = mockStyles.standard;
        expect(roverButton).toHaveStyle("padding: 10px");
    });
    it("has a central text alignment", () => {
        const roverButton = screen.getByTestId("roverButton");
        roverButton.style.cssText = mockStyles.standard;
        expect(roverButton).toHaveStyle("text-align: center");
    });
    it("has a block-level display", () => {
        const roverButton = screen.getByTestId("roverButton");
        roverButton.style.cssText = mockStyles.standard;
        expect(roverButton).toHaveStyle("display: block");
    });
    it("has no text decoration", () => {
        const roverButton = screen.getByTestId("roverButton");
        roverButton.style.cssText = mockStyles.standard;
        expect(roverButton).toHaveStyle("text-decoration: none");
    });
    it("has a margin value of 4px (top, bottom) auto (right, left)", () => {
        const roverButton = screen.getByTestId("roverButton");
        roverButton.style.cssText = mockStyles.standard;
        expect(roverButton).toHaveStyle("margin: 4px auto");
    });
    it("displays a pointer cursor on hover", () => {
        const roverButton = screen.getByTestId("roverButton");
        roverButton.style.cssText = mockStyles.standard;
        expect(roverButton).toHaveStyle("cursor: pointer");
    });
    it("displays coral text with a box shadow on hover, with a 0.4 second transition duration", () => {
        const roverButton = screen.getByTestId("roverButton");
        roverButton.style.cssText = mockStyles.standard;
        expect(roverButton).not.toHaveStyle("color: coral");
        expect(roverButton).not.toHaveStyle("box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)");
        expect(roverButton).toHaveStyle("transition-duration: 0.4s");
        roverButton.addEventListener("mouseover", () => {
            roverButton.style.cssText = mockStyles.hover;
        });
        fireEvent.mouseOver(roverButton);
        expect(roverButton).toHaveStyle("color: coral");
        expect(roverButton).toHaveStyle("box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)");
    });
    it("navigates the User to a sol selection screen when clicked", () => {
        expect(window.location.href).not.toContain("/solSelect");
        const roverButton = screen.getByTestId("roverButton");
        fireEvent.click(roverButton);
        expect(window.location.href).toContain("/solSelect");
    });
});