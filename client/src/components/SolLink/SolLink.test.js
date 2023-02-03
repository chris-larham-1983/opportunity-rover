//testing library elements
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//React setup
import React from 'react';
import ReactDOM from 'react-dom';
//SolLink component
import SolLink from './SolLink';
//styling
import mockStyles from './mockStyles';

describe("the <SolLink /> component", () => {
    it("has a class attribute of 'solLink'", () => {

    });
    it("has a height of 500px", () => {

    });
    it("has a width of 320px", () => {

    });
    it("has a border-radius of 3px", () => {

    });
    it("has a 2px, groove, lightslategrey border", () => {

    });
    it("has a flex display", () => {

    });
    it("has a flex-flow value of 'row wrap'", () => {

    });
    it("has a justify-content value of space-evenly", () => {

    });
    it("has an align-items value of center", () => {

    });
    it("includes a martian <img>", () => {

    });
    describe("the martian <img>", () => {
        it("has a class attribute of 'solRepresentative'", () => {

        });
        it("has a 'src' attribute", () => {

        });
        it("has an 'alt' attribute", () => {

        });
        it("has a width of 300px", () => {

        });
        it("has a height of 300px", () => {

        });
        it("has a border radius of 3px", () => {

        });
    });
    it("includes a statistical paragraph", () => {

    });
    describe("the statistical <p>", () => {
        it("has a class attribute of 'solStats'", () => {

        });
        it("has centrally-aligned text", () => {

        });
        it("uses a 24px 'ZCOOL QingKe HuangYou' font", () => {

        });
        it("has a border radius of 3px", () => {

        });
        it("details the sol and earth date of the photos to which it links", () => {

        });
        it("details the total photos available for that particular sol", () => {

        });
        it("lists the abbreviations of the cameras used to take the photos", () => {

        });
        it("provides a link back to the top of the page", () => {

        });
    });
});
