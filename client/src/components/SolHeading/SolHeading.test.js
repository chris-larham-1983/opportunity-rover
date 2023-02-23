//React setup
import React from 'react';
//testing library setup
import { render, screen } from '@testing-library/react';
//enable usage of 'toHaveStyle()' matcher
import '@testing-library/jest-dom/extend-expect';
//styling
import mockStyles from './mockStyles';
//<SolHeading /> component
import SolHeading from '../SolHeading/SolHeading';

describe("The <SolHeading /> component", () => {
    beforeEach(() => {
        render(<SolHeading heading={`Dummy Heading`} />);
    });

    it("consists of a <div> element and a <p> element", () => {
        const divElement = document.getElementsByTagName("DIV");
        const pElement = document.getElementsByTagName("P");
        expect(divElement.length).toBeGreaterThanOrEqual(1);
        expect(pElement.length).toEqual(1);
    });
    describe("the <div> element", () => {
        it("has a class attribute of 'marsTableCell'", () => {
            const marsTableCell = screen.getByTestId("marsTableCell");
            expect(marsTableCell.getAttribute("class")).toBe("marsTableCell");
        });
        it("has a red background color", () => {
            const marsTableCell = screen.getByTestId("marsTableCell");
            marsTableCell.style.cssText = mockStyles.marsTableCell;
            expect(marsTableCell).toHaveStyle("background-color: #cc1e2c");
        });
        it("has a width of 99%", () => {
            const marsTableCell = screen.getByTestId("marsTableCell");
            marsTableCell.style.cssText = mockStyles.marsTableCell;
            expect(marsTableCell).toHaveStyle("width: 99%");
        });
        it("has a flex display", () => {
            const marsTableCell = screen.getByTestId("marsTableCell");
            marsTableCell.style.cssText = mockStyles.marsTableCell;
            expect(marsTableCell).toHaveStyle("display: flex");
        });
        it("has a column wrap flex flow", () => {
            const marsTableCell = screen.getByTestId("marsTableCell");
            marsTableCell.style.cssText = mockStyles.marsTableCell;
            expect(marsTableCell).toHaveStyle("flex-flow: column wrap");
        });
        it("centers its content", () => {
            const marsTableCell = screen.getByTestId("marsTableCell");
            marsTableCell.style.cssText = mockStyles.marsTableCell;
            expect(marsTableCell).toHaveStyle("justify-content: center");
        });
        it("aligns its items centrally", () => {
            const marsTableCell = screen.getByTestId("marsTableCell");
            marsTableCell.style.cssText = mockStyles.marsTableCell;
            expect(marsTableCell).toHaveStyle("align-items: center");
        });
        it("has a margin of 5px (top, bottom) auto (left, right)", () => {
            const marsTableCell = screen.getByTestId("marsTableCell");
            marsTableCell.style.cssText = mockStyles.marsTableCell;
            expect(marsTableCell).toHaveStyle("margin: 5px auto");
        });
        it("has a border radius of 3px", () => {
            const marsTableCell = screen.getByTestId("marsTableCell");
            marsTableCell.style.cssText = mockStyles.marsTableCell;
            expect(marsTableCell).toHaveStyle("border-radius: 3px");
        });
    });
    describe("the <p> element", () => {
        it("has a class attribute of 'photoDescription'", () => {
            const photoDescription = screen.getByTestId("photoDescription");
            expect(photoDescription.getAttribute("class")).toEqual("photoDescription");
        });
        it("has a 26px font size", () => {
            const photoDescription = screen.getByTestId("photoDescription");
            photoDescription.style.cssText = mockStyles.photoDescription;
            expect(photoDescription).toHaveStyle("font-size: 26px");
        });
        it("displays centrally-aligned text", () => {
            const photoDescription = screen.getByTestId("photoDescription");
            photoDescription.style.cssText = mockStyles.photoDescription;
            expect(photoDescription).toHaveStyle("text-align: center");
        });
        it("has a coral background color", () => {
            const photoDescription = screen.getByTestId("photoDescription");
            photoDescription.style.cssText = mockStyles.photoDescription;
            expect(photoDescription).toHaveStyle("background-color: coral");
        });
        it("has a bold font weight", () => {
            const photoDescription = screen.getByTestId("photoDescription");
            photoDescription.style.cssText = mockStyles.photoDescription;
            expect(photoDescription).toHaveStyle("font-weight: bold");
        });
        it("uses the 'ZCOOL QingKe HuangYou' font", () => {
            const photoDescription = screen.getByTestId("photoDescription");
            photoDescription.style.cssText = mockStyles.photoDescription;
            expect(photoDescription).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
        });
        it("has a 3px border radius", () => {
            const photoDescription = screen.getByTestId("photoDescription");
            photoDescription.style.cssText = mockStyles.photoDescription;
            expect(photoDescription).toHaveStyle("border-radius: 3px");
        });
        it("has a 5px (top, bottom) auto (left, right) margin", () => {
            const photoDescription = screen.getByTestId("photoDescription");
            photoDescription.style.cssText = mockStyles.photoDescription;
            expect(photoDescription).toHaveStyle("margin: 5px auto");
        });
        it("has 5px of padding", () => {
            const photoDescription = screen.getByTestId("photoDescription");
            photoDescription.style.cssText = mockStyles.photoDescription;
            expect(photoDescription).toHaveStyle("padding: 5px");
        });
    });
});