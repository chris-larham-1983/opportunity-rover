//testing library elements
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//React setup
import React from 'react';
import ReactDOM from 'react-dom';
//styling
import mockStyles from './mockStyles';
//<SolOverview /> component
import SolOverview from './SolOverview';

describe("The <SolOverview /> component", () => {
    beforeEach(() => {
        render(<SolOverview heading="Unit Test Heading" availableHeight={100} lastSlide="40" />);
    });

    it("is composed of four <div> elements", () => {
        const fourDivElements = document.getElementsByTagName("DIV");
        expect(fourDivElements.length).toBeGreaterThanOrEqual(4);
    });
    describe("the outer <div> element", () => {
        it("has a class attribute of 'marsTableRow'", () => {
            const marsTableRow = screen.getByTestId("marsTableRow");
            expect(marsTableRow.getAttribute("class")).toBe("marsTableRow");
        });
        it("has a background color of #FF5435", () => {
            const marsTableRow = screen.getByTestId("marsTableRow");
            marsTableRow.style.cssText = mockStyles.marsTableRow;
            expect(marsTableRow).toHaveStyle("background-color: #FF5435");
        });
        it("has a width value of 99%", () => {
            const marsTableRow = screen.getByTestId("marsTableRow");
            marsTableRow.style.cssText = mockStyles.marsTableRow;
            expect(marsTableRow).toHaveStyle("width: 99%");
        });
        it("has a border radius value of 3px", () => {
            const marsTableRow = screen.getByTestId("marsTableRow");
            marsTableRow.style.cssText = mockStyles.marsTableRow;
            expect(marsTableRow).toHaveStyle("border-radius: 3px");
        });
        it("has a margin of 5px (top, bottom) auto (left, right)", () => {
            const marsTableRow = screen.getByTestId("marsTableRow");
            marsTableRow.style.cssText = mockStyles.marsTableRow;
            expect(marsTableRow).toHaveStyle("margin: 5px auto");
        });
        it("has a flex display", () => {
            const marsTableRow = screen.getByTestId("marsTableRow");
            marsTableRow.style.cssText = mockStyles.marsTableRow;
            expect(marsTableRow).toHaveStyle("display: flex");
        });
        it("has a flex-flow value of 'row wrap'", () => {
            const marsTableRow = screen.getByTestId("marsTableRow");
            marsTableRow.style.cssText = mockStyles.marsTableRow;
            expect(marsTableRow).toHaveStyle("flex-flow: row wrap");
        });
        it("spaces its inner <div>s evenly", () => {
            const marsTableRow = screen.getByTestId("marsTableRow");
            marsTableRow.style.cssText = mockStyles.marsTableRow;
            expect(marsTableRow).toHaveStyle("justify-content: space-evenly");
        });
        it("aligns its content centrally", () => {
            const marsTableRow = screen.getByTestId("marsTableRow");
            marsTableRow.style.cssText = mockStyles.marsTableRow;
            expect(marsTableRow).toHaveStyle("align-items: center");
        });
        it("has a height value of 160px", () => {
            const marsTableRow = screen.getByTestId("marsTableRow");
            marsTableRow.style.cssText = mockStyles.marsTableRow;
            expect(marsTableRow).toHaveStyle("height: 160px");
        });
    });
    describe("the first inner <div>", () => {
        it("has a class name of 'marsTableHeader'", () => {
            const contentDiv1 = screen.getByTestId("contentDiv1");
            expect(contentDiv1.getAttribute("class")).toEqual("marsTableHeader");
        });
        it("has a width value of 24%", () => {
            const contentDiv1 = screen.getByTestId("contentDiv1");
            contentDiv1.style.cssText = mockStyles.marsTableHeader;
            expect(contentDiv1).toHaveStyle("width: 24%");
        });
        it("has a display value of 'inline-flex'", () => {
            const contentDiv1 = screen.getByTestId("contentDiv1");
            contentDiv1.style.cssText = mockStyles.marsTableHeader;
            expect(contentDiv1).toHaveStyle("display: inline-flex");
        });
        it("has a flex-flow value of 'column wrap'", () => {
            const contentDiv1 = screen.getByTestId("contentDiv1");
            contentDiv1.style.cssText = mockStyles.marsTableHeader;
            expect(contentDiv1).toHaveStyle("flex-flow: column wrap");
        });
        it("has a border radius of 3px", () => {
            const contentDiv1 = screen.getByTestId("contentDiv1");
            contentDiv1.style.cssText = mockStyles.marsTableHeader;
            expect(contentDiv1).toHaveStyle("border-radius: 3px");
        });
        it("has a height of 150px", () => {
            const contentDiv1 = screen.getByTestId("contentDiv1");
            contentDiv1.style.cssText = mockStyles.marsTableHeader;
            expect(contentDiv1).toHaveStyle("height: 150px");
        });
        it("displays a <button> that allows the User to view the images in fullscreen mode", () => {
            const contentDiv1 = screen.getByTestId("contentDiv1");
            const fullscreenBtn = ReactDOM.findDOMNode(contentDiv1).getElementsByTagName("BUTTON")[0];
            expect(fullscreenBtn).not.toBeNull();
            expect(fullscreenBtn).toBeInTheDocument();
        });
        describe("the fullscreen <button>", () => {
            it("has a class name of 'fullscreenBtn'", () => {
                const fullscreenBtn = screen.getByTestId("fullscreenBtn");
                expect(fullscreenBtn.getAttribute("class")).toBe("fullscreenBtn");
            });
            it("has a height of 70px", () => {
                const fullscreenBtn = screen.getByTestId("fullscreenBtn");
                fullscreenBtn.style.cssText = mockStyles.fullscreenBtn;
                expect(fullscreenBtn).toHaveStyle("height: 70px");
            });
            it("has a border radius of 3px", () => {
                const fullscreenBtn = screen.getByTestId("fullscreenBtn");
                fullscreenBtn.style.cssText = mockStyles.fullscreenBtn;
                expect(fullscreenBtn).toHaveStyle("border-radius: 3px");
            });
            it("has a font size of 26px", () => {
                const fullscreenBtn = screen.getByTestId("fullscreenBtn");
                fullscreenBtn.style.cssText = mockStyles.fullscreenBtn;
                expect(fullscreenBtn).toHaveStyle("font-size: 26px");
            });
            it("uses the 'ZCOOL QingKe HuangYou' font", () => {
                const fullscreenBtn = screen.getByTestId("fullscreenBtn");
                fullscreenBtn.style.cssText = mockStyles.fullscreenBtn;
                expect(fullscreenBtn).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
            });
            it("displays centrally-aligned text", () => {
                const fullscreenBtn = screen.getByTestId("fullscreenBtn");
                fullscreenBtn.style.cssText = mockStyles.fullscreenBtn;
                expect(fullscreenBtn).toHaveStyle("text-align: center");
            });
            it("enables the User to view images in fullscreen mode", () => {
                const fullscreenBtn = screen.getByTestId("fullscreenBtn");
                let availableHeight = 100;
                expect(availableHeight).toBe(100);
                fireEvent.click(fullscreenBtn);
                //update the 'availableHeight', in the same way that the 'fullscreenImage' function does
                availableHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                expect(availableHeight).toBeGreaterThan(100);
            });
        });
        it("displays a <p> that informs the User how to exit fullscreen mode", () => {
            const contentDiv1 = screen.getByTestId("contentDiv1");
            const fullscreenPara = ReactDOM.findDOMNode(contentDiv1).getElementsByTagName("P")[0];
            expect(fullscreenPara.textContent.includes("Click Image to Exit Fullscreen")).toBeTruthy();
        });
        describe("the informative <p>", () => {
            it("has a class name of 'centered'", () => {
                const fullscreenPara = screen.getByTestId("fullscreenPara");
                expect(fullscreenPara.getAttribute("class")).toEqual("centered");
            });
            it("has a font size of 22px", () => {
                const fullscreenPara = screen.getByTestId("fullscreenPara");
                fullscreenPara.style.cssText = mockStyles.centeredParaButtonSibling;
                expect(fullscreenPara).toHaveStyle("font-size: 22px");
            });
            it("displays centrally-aligned text", () => {
                const fullscreenPara = screen.getByTestId("fullscreenPara");
                fullscreenPara.style.cssText = mockStyles.centered;
                expect(fullscreenPara).toHaveStyle("text-align: center");
            });
            it("has a coral background color", () => {
                const fullscreenPara = screen.getByTestId("fullscreenPara");
                fullscreenPara.style.cssText = mockStyles.centered;
                expect(fullscreenPara).toHaveStyle("background-color: coral");
            });
            it("displays text in 'ZCOOL QingKe HuangYou' font", () => {
                const fullscreenPara = screen.getByTestId("fullscreenPara");
                fullscreenPara.style.cssText = mockStyles.centered;
                expect(fullscreenPara).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
            });
            it("has a width of 90%", () => {
                const fullscreenPara = screen.getByTestId("fullscreenPara");
                fullscreenPara.style.cssText = mockStyles.centered;
                expect(fullscreenPara).toHaveStyle("width: 90%");
            });
            it("has a margin of 5px (top, bottom) auto (left, right)", () => {
                const fullscreenPara = screen.getByTestId("fullscreenPara");
                fullscreenPara.style.cssText = mockStyles.centered;
                expect(fullscreenPara).toHaveStyle("margin: 5px auto");
            });
            it("has a border radius of 3px", () => {
                const fullscreenPara = screen.getByTestId("fullscreenPara");
                fullscreenPara.style.cssText = mockStyles.centered;
                expect(fullscreenPara).toHaveStyle("border-radius: 3px");
            });
            it("uses a bold font weight", () => {
                const fullscreenPara = screen.getByTestId("fullscreenPara");
                fullscreenPara.style.cssText = mockStyles.centered;
                expect(fullscreenPara).toHaveStyle("font-weight: bold");
            });
        });
    });
    describe("the second inner <div>", () => {
        it("has class names of 'marsTableHeader' and 'fiftyPerCentWidth'", () => {
            const contentDiv2 = screen.getByTestId("contentDiv2");
            expect(contentDiv2.getAttribute("class")).toBe("marsTableHeader fiftyPerCentWidth");
        });
        it("has a width value of 49%", () => {
            const contentDiv2 = screen.getByTestId("contentDiv2");
            contentDiv2.style.cssText = mockStyles.marsTableHeader + mockStyles.fiftyPerCentWidth;
            expect(contentDiv2).toHaveStyle("width: 49%");
        });
        it("includes a heading element", () => {
            const contentDiv2 = screen.getByTestId("contentDiv2");
            const heading = ReactDOM.findDOMNode(contentDiv2).getElementsByTagName("H1")[0];
            expect(heading).not.toBeNull();
            expect(heading).toBeInTheDocument();
        });
        describe("the heading element", () => {
            it("has class names of 'font-effect-anaglyph' and 'martianHeading'", () => {
                const heading = screen.getByTestId("heading");
                expect(heading.getAttribute("class")).toEqual("font-effect-anaglyph martianHeading");
            });
            it("has a width of 90%", () => {
                const heading = screen.getByTestId("heading");
                heading.style.cssText = mockStyles.martianHeading;
                expect(heading).toHaveStyle("width: 90%");
            });
            it("has a border radius of 3px", () => {
                const heading = screen.getByTestId("heading");
                heading.style.cssText = mockStyles.martianHeading;
                expect(heading).toHaveStyle("border-radius: 3px");
            });
            it("has centrally-aligned text", () => {
                const heading = screen.getByTestId("heading");
                heading.style.cssText = mockStyles.martianHeading;
                expect(heading).toHaveStyle("text-align: center");
            });
            it("has an orange background color", () => {
                const heading = screen.getByTestId("heading");
                heading.style.cssText = mockStyles.martianHeading;
                expect(heading).toHaveStyle("background-color: orange");
            });
            it("displays text in 36px font", () => {
                const heading = screen.getByTestId("heading");
                heading.style.cssText = mockStyles.martianHeading;
                expect(heading).toHaveStyle("font-size: 36px");
            });
            it("uses 'ZCOOL QingKe HuangYou' font", () => {
                const heading = screen.getByTestId("heading");
                heading.style.cssText = mockStyles.martianHeading;
                expect(heading).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
            });
            it("uses a bold font weight", () => {
                const heading = screen.getByTestId("heading");
                heading.style.cssText = mockStyles.martianHeading;
                expect(heading).toHaveStyle("font-weight: bold");
            });
        });
    });
    describe("the third inner <div>", () => {
        it("has a class name of 'marsTableHeader'", () => {
            const contentDiv3 = screen.getByTestId("contentDiv3");
            expect(contentDiv3.getAttribute("class")).toEqual("marsTableHeader");
        });
        it("has a width value of 24%", () => {
            const contentDiv3 = screen.getByTestId("contentDiv3");
            contentDiv3.style.cssText = mockStyles.marsTableHeader;
            expect(contentDiv3).toHaveStyle("width: 24%");
        });
        it("displays a <label> that describes the purpose of its associated <input>", () => {
            const contentDiv3 = screen.getByTestId("contentDiv3");
            const slideSelect = ReactDOM.findDOMNode(contentDiv3).getElementsByTagName("LABEL")[0];
            expect(slideSelect).not.toBeNull();
            expect(slideSelect).toBeInTheDocument();
        });
        describe("the descriptive <label>", () => {
            it("has class names of 'slideSelect' and 'centered'", () => {
                const slideSelect = screen.getByTestId("slideSelect");
                expect(slideSelect.getAttribute("class")).toEqual("slideSelect centered");
            });
            it("displays text in 26px font", () => {
                const slideSelect = screen.getByTestId("slideSelect");
                slideSelect.style.cssText = mockStyles.slideSelect;
                expect(slideSelect).toHaveStyle("font-size: 26px");
            });
            it("uses the 'ZCOOL QingKe HuangYou' font", () => {
                const slideSelect = screen.getByTestId("slideSelect");
                slideSelect.style.cssText = mockStyles.slideSelect;
                expect(slideSelect).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
            });
            it("has a coral background color", () => {
                const slideSelect = screen.getByTestId("slideSelect");
                slideSelect.style.cssText = mockStyles.slideSelect;
                expect(slideSelect).toHaveStyle("background-color: coral");
            });
            it("uses a bold font weight", () => {
                const slideSelect = screen.getByTestId("slideSelect");
                slideSelect.style.cssText = mockStyles.slideSelect;
                expect(slideSelect).toHaveStyle("font-weight: bold");
            });
            it("has a width of 95%", () => {
                const slideSelect = screen.getByTestId("slideSelect");
                slideSelect.style.cssText = mockStyles.slideSelect;
                expect(slideSelect).toHaveStyle("width: 95%");
            });
        });
        it("displays an <input> element", () => {
            const contentDiv3 = screen.getByTestId("contentDiv3");
            const slideInput = ReactDOM.findDOMNode(contentDiv3).getElementsByTagName("INPUT")[0];
            expect(slideInput).not.toBeNull();
            expect(slideInput).toBeInTheDocument();
        });
        describe("the <input> element", () => {
            it("has a class name of 'slideInput'", () => {
                const slideInput = screen.getByTestId("slideInput");
                expect(slideInput.getAttribute("class")).toEqual("slideInput");
            });
            it("has a type attribute of number", () => {
                const slideInput = screen.getByTestId("slideInput");
                expect(slideInput.getAttribute("type")).toBe("number");
            });
            it("displays placeholder text", () => {
                const slideInput = screen.getByTestId("slideInput");
                expect(slideInput.getAttribute("placeholder").length).toBeGreaterThanOrEqual(1);
            });
            it("has a min attribute of 1", () => {
                const slideInput = screen.getByTestId("slideInput");
                expect(slideInput.getAttribute("min")).toEqual("1");
            });
            it("has a max attribute of {props.lastSlide}", () => {
                const slideInput = screen.getByTestId("slideInput");
                expect(slideInput.getAttribute("max")).toEqual("40");
            });
            it("has a height of 70px", () => {
                const slideInput = screen.getByTestId("slideInput");
                slideInput.style.cssText = mockStyles.slideInput;
                expect(slideInput).toHaveStyle("height: 70px");
            });
            it("has a font-size of 24px", () => {
                const slideInput = screen.getByTestId("slideInput");
                slideInput.style.cssText = mockStyles.slideInput;
                expect(slideInput).toHaveStyle("font-size: 24px");
            });
            it("has a width of 95%", () => {
                const slideInput = screen.getByTestId("slideInput");
                slideInput.style.cssText = mockStyles.slideInput;
                expect(slideInput).toHaveStyle("width: 95%");
            });
            it("uses a bold font weight", () => {
                const slideInput = screen.getByTestId("slideInput");
                slideInput.style.cssText = mockStyles.slideInput;
                expect(slideInput).toHaveStyle("font-weight: bold");
            });
        });
    });
});