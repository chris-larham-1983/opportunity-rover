//testing library elements
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//React setup
import React from 'react';
//TextCredit component
import TextCredit from './TextCredit';
//styling
import mockStyles from './mockStyles';

describe("The <TextCredit /> component", () => {
    beforeEach(() => {
        render(<TextCredit />)
    });
    it("is written in size 26px 'ZCOOL QingKe HuangYou' font", () => {
        const textCredit = screen.getByTestId("textCredit");
        textCredit.style.cssText = mockStyles;
        expect(textCredit).toHaveStyle("font-size: 26px");
        expect(textCredit).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
    });
    it("has a padding property of 10px", () => {
        const textCredit = screen.getByTestId("textCredit");
        textCredit.style.cssText = mockStyles;
        expect(textCredit).toHaveStyle("padding: 10px");
    });
    it("has centrally-aligned text", () => {
        const textCredit = screen.getByTestId("textCredit");
        textCredit.style.cssText = mockStyles;
        expect(textCredit).toHaveStyle("text-align: center");
    });
    it("has a martian red background color", () => {
        const textCredit = screen.getByTestId("textCredit");
        textCredit.style.cssText = mockStyles;
        expect(textCredit).toHaveStyle("background-color: #741630");
    });
    it("has white text", () => {
        const textCredit = screen.getByTestId("textCredit");
        textCredit.style.cssText = mockStyles;
        expect(textCredit).toHaveStyle("color: white");
    });
    it("has a width of 99%", () => {
        const textCredit = screen.getByTestId("textCredit");
        textCredit.style.cssText = mockStyles;
        expect(textCredit).toHaveStyle("width: 99%");
    });
    it("has a border radius of 3px", () => {
        const textCredit = screen.getByTestId("textCredit");
        textCredit.style.cssText = mockStyles;
        expect(textCredit).toHaveStyle("border-radius: 3px");
    });
    it("has a margin of 10px (top, bottom) auto (left, right)", () => {
        const textCredit = screen.getByTestId("textCredit");
        textCredit.style.cssText = mockStyles;
        expect(textCredit).toHaveStyle("margin: 10px auto");
    });
});