//testing library setup
import { render } from '@testing-library/react';
//enable usage of 'toHaveStyle()' matcher
import '@testing-library/jest-dom/extend-expect';
//React setup
import React from 'react';
//MissionOverview component
import MissionOverview from './MissionOverview';
//styling
import mockStyles from './mockStyles.js';

describe("The <MissionOverview /> component", () => {
    beforeEach(() => {
        render(<MissionOverview />);
    });
    it("consists of four paragraphs", () => {
        const missionParagraphs = document.getElementsByTagName("P");
        expect(missionParagraphs.length).toEqual(4);
    });
    describe("Each <MissionOverview /> paragraph", () => {
        test("has a width property of 99%", () => {
            const missionParagraph = document.getElementsByTagName("P")[0];
            missionParagraph.style.cssText = mockStyles;
            expect(missionParagraph).toHaveStyle("width: 99%");
        });
        test("has a border-radius property of 3px", () => {
            const missionParagraph = document.getElementsByTagName("P")[1];
            missionParagraph.style.cssText = mockStyles;
            expect(missionParagraph).toHaveStyle("border-radius: 3px");
        });
        test("displays text in 'ZCOOL QingKe HuangYou' 30px font", () => {
            const missionParagraph = document.getElementsByTagName("P")[2];
            missionParagraph.style.cssText = mockStyles;
            expect(missionParagraph).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
        });
        test("has centrally-aligned text", () => {
            const missionParagraph = document.getElementsByTagName("P")[3];
            missionParagraph.style.cssText = mockStyles;
            expect(missionParagraph).toHaveStyle("text-align: center");
        });
        test("has a background color of #EDBB99", () => {
            const missionParagraph = document.getElementsByTagName("P")[0];
            missionParagraph.style.cssText = mockStyles;
            expect(missionParagraph).toHaveStyle("background-color: #EDBB99");
        });
    });
});