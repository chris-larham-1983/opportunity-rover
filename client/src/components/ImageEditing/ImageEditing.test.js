//testing library elements
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//React setup
import React from 'react';
//SolSlideshow component
import SolSlideshow from '../SolSlideshow/SolSlideshow';
//ImageEditing component
import ImageEditing from './ImageEditing';
//styling
import mockStyles from './mockStyles';

describe("The <ImageEditing /> component", () => {
    let percentageHeight = 75;
    const setPercentageHeight = (value) => {
        percentageHeight = value;
        screen.getByTestId("heightRange").setAttribute("value", value);
        screen.getByTestId("heightRange").setAttribute("class", `_${value}PerCent`);
    };

    beforeEach(() => {
        render(<ImageEditing percentageHeight={percentageHeight} setPercentageHeight={setPercentageHeight}/>);
    });
    it("comprises an outer <div> with a class attribute of 'marsTableCell'", () => {
        const marsTableCell = screen.getByTestId("marsTableCell");
        expect(marsTableCell).toBeInTheDocument();
        expect(marsTableCell.getAttribute("class")).toEqual("marsTableCell");
    });
    describe("the outer <div>", () => {
        it("contains an <h2> element", () => {
            const marsTableCell = screen.getByTestId("marsTableCell");
            const controlsHeading = marsTableCell.getElementsByTagName("H2")[0];
            expect(controlsHeading).toBeInTheDocument();
        });
        describe("the <h2> element", () => {
            it("toggles the display of an image editing <div>", () => {
                const numberOfDivs = document.getElementsByTagName("DIV").length;
                const controlsHeading = screen.getByTestId("controlsHeading");
                fireEvent.click(controlsHeading);
                expect(document.getElementsByTagName("DIV").length).toBeGreaterThan(numberOfDivs);
                const editingDiv = screen.getByTestId("editingDiv");
                expect(editingDiv).toBeInTheDocument();
                expect(editingDiv).not.toBeNull();
            });
            describe("the image editing <div>", () => {
                it("contains 8 <label> elements that describe the image attributes that can be edited", () => {
                    const controlsHeading = screen.getByTestId("controlsHeading");
                    fireEvent.click(controlsHeading);
                    expect(document.getElementsByTagName("LABEL").length).toEqual(8);
                });
                it("enables the User to alter the martian image's width, with the percentage displayed on the slider thumb", () => {
                    const controlsHeading = screen.getByTestId("controlsHeading");
                    fireEvent.click(controlsHeading);
                    const widthEditor = screen.getByTestId("widthEditor");
                    fireEvent.click(widthEditor);
                    const decreaseWidth = screen.getByTestId("decreaseWidth");
                    const increaseWidth = screen.getByTestId("increaseWidth");
                    const widthRange = screen.getByTestId("widthRange");
                    expect(widthRange.getAttribute("value")).toBe("100");
                    fireEvent.input(widthRange, { target: { value: "75" }});
                    expect(widthRange.getAttribute("value")).toBe("75");
                    expect(widthRange.getAttribute("class")).toEqual("_75PerCent");
                    for(let click = 1; click <= 75; click++) {
                        fireEvent.click(decreaseWidth);
                    }
                    expect(widthRange.getAttribute("value")).toBe("1");
                    expect(widthRange.getAttribute("class")).toEqual("_1PerCent");
                    for(let click = 1; click <= 100; click++) {
                        expect(widthRange.getAttribute("value")).toBe(`${click}`);
                        expect(widthRange.getAttribute("class")).toEqual(`_${click}PerCent`);
                        fireEvent.click(increaseWidth);
                    }
                    expect(widthRange.getAttribute("value")).toBe("100");
                    fireEvent.click(increaseWidth);
                    expect(widthRange.getAttribute("value")).not.toBe("101");
                });
                it("enables the User to alter the martian image's height, with the percentage displayed on the slider thumb", () => {
                    const controlsHeading = screen.getByTestId("controlsHeading");
                    fireEvent.click(controlsHeading);
                    const heightEditor = screen.getByTestId("heightEditor");
                    fireEvent.click(heightEditor);
                    const heightRange = screen.getByTestId("heightRange");
                    expect(heightRange.getAttribute("value")).toBe("75");
                    fireEvent.input(heightRange, { target: { value: "100" }});
                    expect(percentageHeight).toBe("100");
                    expect(heightRange.getAttribute("class")).toEqual("_100PerCent");
                    for(let click = 1; click <= 101; click++) {
                        if(percentageHeight > 1) {
                            percentageHeight--;
                            setPercentageHeight(percentageHeight);
                        }
                    }
                    expect(percentageHeight).toBe(1);
                    expect(heightRange.getAttribute("value")).toBe("1");
                    expect(heightRange.getAttribute("class")).toEqual("_1PerCent");
                    for(let click = 1; click <= 100; click++) {
                        if(percentageHeight <= 100) {
                            expect(percentageHeight).toBe(click);
                            expect(heightRange.getAttribute("class")).toEqual(`_${click}PerCent`);
                            if(percentageHeight < 100) {
                                percentageHeight++;
                            }
                            setPercentageHeight(percentageHeight);
                        }
                    }
                    expect(percentageHeight).toBe(100);
                    expect(heightRange.getAttribute("value")).toBe("100");
                    expect(heightRange.getAttribute("class")).toBe("_100PerCent");
                    expect(percentageHeight).not.toBe(101);
                });
                it("enables the User to alter the martian image's blur effect, with the pixel blur effect displayed on the slider thumb", () => {
                    const controlsHeading = screen.getByTestId("controlsHeading");
                    fireEvent.click(controlsHeading);
                    const blurEditor = screen.getByTestId("blurEditor");
                    fireEvent.click(blurEditor);
                    const decreaseBlur = screen.getByTestId("decreaseBlur");
                    const increaseBlur = screen.getByTestId("increaseBlur");
                    const blurRange = screen.getByTestId("blurRange");
                    expect(blurRange.getAttribute("value")).toBe("0");
                    fireEvent.input(blurRange, { target: { value: "75" }});
                    expect(blurRange.getAttribute("value")).toBe("75");
                    expect(blurRange.getAttribute("class")).toEqual("_75Pixel");
                    for(let click = 1; click <= 75; click++) {
                        fireEvent.click(decreaseBlur);
                    }
                    expect(blurRange.getAttribute("value")).toBe("0");
                    expect(blurRange.getAttribute("class")).toEqual("_0Pixel");
                    for(let click = 1; click <= 100; click++) {
                        fireEvent.click(increaseBlur);
                        expect(blurRange.getAttribute("value")).toBe(`${click}`);
                        expect(blurRange.getAttribute("class")).toEqual(`_${click}Pixel`);
                    }
                    expect(blurRange.getAttribute("value")).toBe("100");
                    fireEvent.click(increaseBlur);
                    expect(blurRange.getAttribute("value")).not.toBe("101");
                });
                it("enables the User to alter the martian image's brightness, with the percentage brightness effect displayed on the slider thumb", () => {
                    const controlsHeading = screen.getByTestId("controlsHeading");
                    fireEvent.click(controlsHeading);
                    const brightnessEditor = screen.getByTestId("brightnessEditor");
                    fireEvent.click(brightnessEditor);
                    const decreaseBrightness = screen.getByTestId("decreaseBrightness");
                    const increaseBrightness = screen.getByTestId("increaseBrightness");
                    const brightnessRange = screen.getByTestId("brightnessRange");
                    expect(brightnessRange.getAttribute("value")).toBe("100");
                    fireEvent.input(brightnessRange, { target: { value: "790" }});
                    expect(brightnessRange.getAttribute("value")).toBe("790");
                    expect(brightnessRange.getAttribute("class")).toEqual("_790PerCent");
                    for(let click = 1; click <= 79; click++) {
                        fireEvent.click(decreaseBrightness);
                    }
                    expect(brightnessRange.getAttribute("value")).toBe("0");
                    expect(brightnessRange.getAttribute("class")).toEqual("_0PerCent");
                    for(let click = 1; click <= 80; click++) {
                        fireEvent.click(increaseBrightness);
                        expect(brightnessRange.getAttribute("value")).toBe(`${click * 10}`);
                        expect(brightnessRange.getAttribute("class")).toEqual(`_${click * 10}PerCent`);
                    }
                    expect(brightnessRange.getAttribute("value")).toBe("800");
                    fireEvent.click(increaseBrightness);
                    expect(brightnessRange.getAttribute("value")).not.toBe("810");
                });
                it("enables the User to alter the martian image's contrast, with the percentage contrast effect displayed on the slider thumb", () => {
                    const controlsHeading = screen.getByTestId("controlsHeading");
                    fireEvent.click(controlsHeading);
                    const contrastEditor = screen.getByTestId("contrastEditor");
                    fireEvent.click(contrastEditor);
                    const decreaseContrast = screen.getByTestId("decreaseContrast");
                    const increaseContrast = screen.getByTestId("increaseContrast");
                    const contrastRange = screen.getByTestId("contrastRange");
                    expect(contrastRange.getAttribute("value")).toBe("100");
                    fireEvent.input(contrastRange, { target: { value: "200" }});
                    expect(contrastRange.getAttribute("value")).toBe("200");
                    expect(contrastRange.getAttribute("class")).toEqual("_200PerCent");
                    for(let click = 1; click <= 101; click++) {
                        fireEvent.click(decreaseContrast);
                    }
                    expect(contrastRange.getAttribute("value")).toBe("0");
                    expect(contrastRange.getAttribute("class")).toEqual("_0PerCent");
                    for(let click = 1; click <= 100; click++) {
                        fireEvent.click(increaseContrast);
                        expect(contrastRange.getAttribute("value")).toBe(`${click * 2}`);
                        expect(contrastRange.getAttribute("class")).toEqual(`_${click * 2}PerCent`);
                    }
                    expect(contrastRange.getAttribute("value")).toBe("200");
                    fireEvent.click(increaseContrast);
                    expect(contrastRange.getAttribute("value")).not.toBe("202");
                });
            });
        });
    });
});

