//testing library elements
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//React setup
import React from 'react';
import ReactDOM from 'react-dom';
//PageTraversal component
import PageTraversal from './PageTraversal';
//styling
import mockStyles from './mockStyles';

describe("The <PageTraversal /> component", () => {
    beforeEach(() => {
        render(<PageTraversal />);
    });
    it("has a class attribute of 'pageTraversal'", () => {
        const pageTraversal = screen.getByTestId("pageTraversal");
        expect(pageTraversal.getAttribute("class")).toEqual("pageTraversal");
    });
    it("is 80px in height", () => {
        const pageTraversal = screen.getByTestId("pageTraversal");
        pageTraversal.style.cssText = mockStyles.pageTraversal;
        expect(pageTraversal).toHaveStyle("height: 80px");
    });
    it("has a margin attribute of 10px (top, bottom) auto (left, right)", () => {
        const pageTraversal = screen.getByTestId("pageTraversal");
        pageTraversal.style.cssText = mockStyles.pageTraversal;
        expect(pageTraversal).toHaveStyle("margin: 10px auto");
    });
    it("has a width attribute of 99%", () => {
        const pageTraversal = screen.getByTestId("pageTraversal");
        pageTraversal.style.cssText = mockStyles.pageTraversal;
        expect(pageTraversal).toHaveStyle("width: 99%");
    });
    it("has a 1px-thick, solid, red border", () => {
        const pageTraversal = screen.getByTestId("pageTraversal");
        pageTraversal.style.cssText = mockStyles.pageTraversal;
        expect(pageTraversal).toHaveStyle("border: 1px solid #741630");
    });
    it("has a 3px border radius", () => {
        const pageTraversal = screen.getByTestId("pageTraversal");
        pageTraversal.style.cssText = mockStyles.pageTraversal;
        expect(pageTraversal).toHaveStyle("border-radius: 3px");
    });
    it("has a coral background color", () => {
        const pageTraversal = screen.getByTestId("pageTraversal");
        pageTraversal.style.cssText = mockStyles.pageTraversal;
        expect(pageTraversal).toHaveStyle("background-color: coral");
    });
    it("has a flex display", () => {
        const pageTraversal = screen.getByTestId("pageTraversal");
        pageTraversal.style.cssText = mockStyles.pageTraversal;
        expect(pageTraversal).toHaveStyle("display: flex");
    });
    it("has a 'row wrap' flex flow", () => {
        const pageTraversal = screen.getByTestId("pageTraversal");
        pageTraversal.style.cssText = mockStyles.pageTraversal;
        expect(pageTraversal).toHaveStyle("flex-flow: row wrap");
    });
    it("has a 'space-evenly' content justification", () => {
        const pageTraversal = screen.getByTestId("pageTraversal");
        pageTraversal.style.cssText = mockStyles.pageTraversal;
        expect(pageTraversal).toHaveStyle("justify-content: space-evenly");
    });
    it("aligns items centrally along the cross axis", () => {
        const pageTraversal = screen.getByTestId("pageTraversal");
        pageTraversal.style.cssText = mockStyles.pageTraversal;
        expect(pageTraversal).toHaveStyle("align-items: center");
    });
    it("contains an <input /> element", () => {
        const pageTraversal = screen.getByTestId("pageTraversal");
        const childInput = ReactDOM.findDOMNode(pageTraversal).getElementsByTagName("INPUT")[0];
        expect(childInput).not.toBeNull();
        expect(childInput).toBeInTheDocument();
    });
    describe("the <input /> element", () => {
        it("has a class attribute of 'desiredSol'", () => {
            const desiredSol = screen.getByTestId("desiredSol");
            expect(desiredSol.getAttribute("class")).toEqual("desiredSol");
        });
        it("has a type attribute of 'number'", () => {
            const desiredSol = screen.getByTestId("desiredSol");
            expect(desiredSol.getAttribute("type")).toBe("number");
        });
        it("displays placeholder text", () => {
            const desiredSol = screen.getByTestId("desiredSol");
            expect(desiredSol.getAttribute("placeholder").length).toBeGreaterThan(1);
        });
        it("has a min attribute of 1", () => {
            const desiredSol = screen.getByTestId("desiredSol");
            expect(desiredSol.getAttribute("min")).toEqual("1");
        });
        it("has a max attribute of 5111", () => {
            const desiredSol = screen.getByTestId("desiredSol");
            expect(desiredSol.getAttribute("max")).toBe("5111");
        });
        it("uses a 24px 'ZCOOL QingKe HuangYou' font", () => {
            const desiredSol = screen.getByTestId("desiredSol");
            desiredSol.style.cssText = mockStyles.desiredSol;
            expect(desiredSol).toHaveStyle("font-size: 24px");
            expect(desiredSol).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
        });
        it("has a height of 70px", () => {
            const desiredSol = screen.getByTestId("desiredSol");
            desiredSol.style.cssText = mockStyles.desiredSol;
            expect(desiredSol).toHaveStyle("height: 70px");
        });
        it("has a width of 48%", () => {
            const desiredSol = screen.getByTestId("desiredSol");
            desiredSol.style.cssText = mockStyles.desiredSol;
            expect(desiredSol).toHaveStyle("width: 48%");
        });
        it("has a 3px border radius", () => {
            const desiredSol = screen.getByTestId("desiredSol");
            desiredSol.style.cssText = mockStyles.desiredSol;
            expect(desiredSol).toHaveStyle("border-radius: 3px");
        });
    });
    it("contains a <button> element", () => {
        const pageTraversal = screen.getByTestId("pageTraversal");
        const childButton = ReactDOM.findDOMNode(pageTraversal).getElementsByTagName("BUTTON")[0];
        expect(childButton).not.toBeNull();
        expect(childButton).toBeInTheDocument();
    });
    describe("the <button> element", () => {
        it("has a class attribute of 'navigateToSol'", () => {
            const navigateToSol = screen.getByTestId("navigateToSol");
            expect(navigateToSol.getAttribute("class")).toEqual("navigateToSol");
        });
        it("enables the user to traverse the page", () => {
            cleanup();
            render(<div>
                <PageTraversal />
                <figure id='1'>Test Paragraph 1</figure>
                <figure id='2'>Test Paragraph 2</figure>
                <figure id='3'>Test Paragraph 3</figure>
                <figure id='4'>Test Paragraph 4</figure>
                <figure id='5'>Test Paragraph 5</figure>
                <figure id='6'>Test Paragraph 6</figure>
            </div>);
            const desiredSol = screen.getByTestId("desiredSol");
            const navigateToSol = screen.getByTestId("navigateToSol");
            expect(window.location.href.includes("#6")).not.toBeTruthy();
            fireEvent.change(desiredSol, { target: {value: '6' }});
            fireEvent.click(navigateToSol);
            expect(window.location.href.includes("#6")).toBeTruthy();
        });
        it("has a 24px 'ZCOOL QingKe HuangYou' font", () => {
            const navigateToSol = screen.getByTestId("navigateToSol");
            navigateToSol.style.cssText = mockStyles.navigateToSol;
            expect(navigateToSol).toHaveStyle("font-size: 24px");
            expect(navigateToSol).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
        });
        it("is 70px in height", () => {
            const navigateToSol = screen.getByTestId("navigateToSol");
            navigateToSol.style.cssText = mockStyles.navigateToSol;
            expect(navigateToSol).toHaveStyle("height: 70px");
        });
        it("has a width of 48%", () => {
            const navigateToSol = screen.getByTestId("navigateToSol");
            navigateToSol.style.cssText = mockStyles.navigateToSol;
            expect(navigateToSol).toHaveStyle("width: 48%");
        });
        it("displays centre-aligned text", () => {
            const navigateToSol = screen.getByTestId("navigateToSol");
            navigateToSol.style.cssText = mockStyles.navigateToSol;
            expect(navigateToSol).toHaveStyle("text-align: center");
        });
        it("has a bold font weight", () => {
            const navigateToSol = screen.getByTestId("navigateToSol");
            navigateToSol.style.cssText = mockStyles.navigateToSol;
            expect(navigateToSol).toHaveStyle("font-weight: bold");
        });
        it("has a border-radius of 3px", () => {
            const navigateToSol = screen.getByTestId("navigateToSol");
            navigateToSol.style.cssText = mockStyles.navigateToSol;
            expect(navigateToSol).toHaveStyle("border-radius: 3px");
        });
    });
});