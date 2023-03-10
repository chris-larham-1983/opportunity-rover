//testing library elements
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//React setup
import React from 'react';
//styling
import mockStyles from './mockStyles.js';
//<CameraFilter /> component
import CameraFilter from './CameraFilter';

describe("The <CameraFilter /> component", () => {
    let solPhotos = [];
    let slideIndex, slideNumber;

    const setSolPhotos = photos => {
        solPhotos = photos;
    };

    const setSlideIndex = value => {
        slideIndex = value;
    };

    const setSlideNumber = value => {
        slideNumber = value;
    };

    beforeEach(() => {
        render(<CameraFilter sol={1} cameras={["ENTRY", "FHAZ", "NAVCAM", "PANCAM", "RHAZ"]} setSolPhotos={setSolPhotos} setSlideIndex={setSlideIndex} setSlideNumber={setSlideNumber} />);
    });
    it("is wrapped in a <div> element with a class attribute of 'marsTableCell'", () => {
        const marsTableCell = screen.getByTestId("marsTableCell");
        expect(marsTableCell.getAttribute("class")).toEqual("marsTableCell");
    });
    describe("the <div> element", () => {
        it("contains an <h2> element", () => {
            const marsTableCell = screen.getByTestId("marsTableCell");
            const camerasHeading = marsTableCell.getElementsByTagName("H2")[0];
            expect(camerasHeading).not.toBeNull();
            expect(camerasHeading).toBeInTheDocument();
        });
        describe("the <h2> element", () => {
            it("has a font size of 32px", () => {
                const camerasHeading = screen.getByTestId("camerasHeading");
                camerasHeading.style.cssText = mockStyles.camerasHeading;
                expect(camerasHeading).toHaveStyle("font-size: 32px");
            });
            it("has a width attribute of 'fit-content'", () => {
                const camerasHeading = screen.getByTestId("camerasHeading");
                camerasHeading.style.cssText = mockStyles.camerasHeading;
                expect(camerasHeading).toHaveStyle("width: fit-content");
            });
            it("has a coral background color", () => {
                const camerasHeading = screen.getByTestId("camerasHeading");
                camerasHeading.style.cssText = mockStyles.camerasHeading;
                expect(camerasHeading).toHaveStyle("background-color: coral");
            });
            it("displays centrally-aligned text", () => {
                const camerasHeading = screen.getByTestId("camerasHeading");
                camerasHeading.style.cssText = mockStyles.camerasHeading;
                expect(camerasHeading).toHaveStyle("text-align: center");
            });
            it("uses 'ZCOOL QingKe HuangYou' font", () => {
                const camerasHeading = screen.getByTestId("camerasHeading");
                camerasHeading.style.cssText = mockStyles.camerasHeading;
                expect(camerasHeading).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
            });
            it("uses 5px of padding", () => {
                const camerasHeading = screen.getByTestId("camerasHeading");
                camerasHeading.style.cssText = mockStyles.camerasHeading;
                expect(camerasHeading).toHaveStyle("padding: 5px");
            });
            it("has a border radius of 3px", () => {
                const camerasHeading = screen.getByTestId("camerasHeading");
                camerasHeading.style.cssText = mockStyles.camerasHeading;
                expect(camerasHeading).toHaveStyle("border-radius: 3px");
            });
            it("has a cursor of type 'pointer'", () => {
                const camerasHeading = screen.getByTestId("camerasHeading");
                camerasHeading.style.cssText = mockStyles.camerasHeading;
                expect(camerasHeading).toHaveStyle("cursor: pointer");
            });
            it("toggles the visibility of a camera-filtering <div> when clicked", () => {
                const camerasHeading = screen.getByTestId("camerasHeading");
                expect(camerasHeading.nextSibling).toBeNull();
                fireEvent.click(camerasHeading);
                expect(screen.getByTestId("camerasDiv")).not.toBeUndefined();
            });
            describe("the camera-filtering <div> element", () => {
                it("has a class attribute of 'camerasFilter'", () => {
                    const camerasHeading = screen.getByTestId("camerasHeading");
                    fireEvent.click(camerasHeading);
                    const camerasFilter = screen.getByTestId("camerasDiv");
                    expect(camerasFilter.getAttribute("class")).toBe("camerasFilter");
                });
                it("has a display property of 'flex'", () => {
                    const camerasHeading = screen.getByTestId("camerasHeading");
                    fireEvent.click(camerasHeading);
                    const camerasFilter = screen.getByTestId("camerasDiv");
                    camerasFilter.style.cssText = mockStyles.camerasFilter;
                    expect(camerasFilter).toHaveStyle("display: flex");
                });
                it("has a flex-flow value of 'row wrap'", () => {
                    const camerasHeading = screen.getByTestId("camerasHeading");
                    fireEvent.click(camerasHeading);
                    const camerasFilter = screen.getByTestId("camerasDiv");
                    camerasFilter.style.cssText = mockStyles.camerasFilter;
                    expect(camerasFilter).toHaveStyle("flex-flow: row wrap");
                });
                it("has a central content justification", () => {
                    const camerasHeading = screen.getByTestId("camerasHeading");
                    fireEvent.click(camerasHeading);
                    const camerasFilter = screen.getByTestId("camerasDiv");
                    camerasFilter.style.cssText = mockStyles.camerasFilter;
                    expect(camerasFilter).toHaveStyle("justify-content: center");
                });
                it("has a coral background color", () => {
                    const camerasHeading = screen.getByTestId("camerasHeading");
                    fireEvent.click(camerasHeading);
                    const camerasFilter = screen.getByTestId("camerasDiv");
                    camerasFilter.style.cssText = mockStyles.camerasFilter;
                    expect(camerasFilter).toHaveStyle("background-color: coral");
                });
                it("has a height value of 'fit-content'", () => {
                    const camerasHeading = screen.getByTestId("camerasHeading");
                    fireEvent.click(camerasHeading);
                    const camerasFilter = screen.getByTestId("camerasDiv");
                    camerasFilter.style.cssText = mockStyles.camerasFilter;
                    expect(camerasFilter).toHaveStyle("height: fit-content");
                });
                it("has a width value of 99%", () => {
                    const camerasHeading = screen.getByTestId("camerasHeading");
                    fireEvent.click(camerasHeading);
                    const camerasFilter = screen.getByTestId("camerasDiv");
                    camerasFilter.style.cssText = mockStyles.camerasFilter;
                    expect(camerasFilter).toHaveStyle("width: 99%");
                });
                it("has a border radius of 3px", () => {
                    const camerasHeading = screen.getByTestId("camerasHeading");
                    fireEvent.click(camerasHeading);
                    const camerasFilter = screen.getByTestId("camerasDiv");
                    camerasFilter.style.cssText = mockStyles.camerasFilter;
                    expect(camerasFilter).toHaveStyle("border-radius: 3px");
                });
                it("has a padding property of 10px", () => {
                    const camerasHeading = screen.getByTestId("camerasHeading");
                    fireEvent.click(camerasHeading);
                    const camerasFilter = screen.getByTestId("camerasDiv");
                    camerasFilter.style.cssText = mockStyles.camerasFilter;
                    expect(camerasFilter).toHaveStyle("padding: 10px");
                });
                it("has a bottom margin of 10px", () => {
                    const camerasHeading = screen.getByTestId("camerasHeading");
                    fireEvent.click(camerasHeading);
                    const camerasFilter = screen.getByTestId("camerasDiv");
                    camerasFilter.style.cssText = mockStyles.camerasFilter;
                    expect(camerasFilter).toHaveStyle("margin-bottom: 10px");
                });
                it("contains a <form> that centre aligns its elements", () => {
                    const camerasHeading = screen.getByTestId("camerasHeading");
                    fireEvent.click(camerasHeading);
                    const camerasFilter = screen.getByTestId("camerasDiv");
                    const formElement = camerasFilter.getElementsByTagName("FORM")[0];
                    formElement.style.cssText = mockStyles.formElement;
                    expect(formElement).not.toBeNull();
                    expect(formElement).toBeInTheDocument();
                    expect(formElement).toHaveStyle("text-align: center");
                })
                describe("the <form> element", () => {
                    it("contains <label>s for all the cameras that were used on that day", () => {
                        const camerasHeading = screen.getByTestId("camerasHeading");
                        fireEvent.click(camerasHeading);
                        const camerasForm = screen.getByTestId("camerasForm");
                        const labels = camerasForm.getElementsByTagName("LABEL");
                        expect(labels.length).toBe(5);
                    });
                    describe("the <label>s", () => {
                        test("display text in bold, 24px 'ZCOOL QingKe HuangYou' font", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const label = screen.getByTestId("label");
                            label.style.cssText = mockStyles.camerasLabel;
                            expect(label).toHaveStyle("font-weight: bold");
                            expect(label).toHaveStyle("font-size: 24px");
                            expect(label).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
                        });
                        test("have a padding value of 0 (top, bottom) 10px (left, right)", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const label = screen.getByTestId("label");
                            label.style.cssText = mockStyles.camerasLabel;
                            expect(label).toHaveStyle("padding: 0 10px");
                        });
                    });
                    it("contains checkboxes for all the cameras that were used on that day", () => {
                        const camerasHeading = screen.getByTestId("camerasHeading");
                        fireEvent.click(camerasHeading);
                        const camerasForm = screen.getByTestId("camerasForm");
                        const checkboxesAndSubmit = camerasForm.getElementsByTagName("INPUT");
                        expect(checkboxesAndSubmit.length).toBe(6);
                        for(let index = 0; index < checkboxesAndSubmit.length - 1; index++) {
                            expect(checkboxesAndSubmit[index].getAttribute("type")).toEqual("checkbox");
                        }
                    });
                    describe("the checkboxes", () => {
                        test("have a height and width attribute of 24px", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const checkbox = screen.getByTestId("FHAZ");
                            checkbox.style.cssText = mockStyles.camerasCheckbox;
                            expect(checkbox).toHaveStyle("height: 24px");
                            expect(checkbox).toHaveStyle("width: 24px");
                        });
                        test("have a left margin of 10px", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const checkbox = screen.getByTestId("FHAZ");
                            checkbox.style.cssText = mockStyles.camerasCheckbox;
                            expect(checkbox).toHaveStyle("margin-left: 10px");
                        });
                    });
                    it("contains a 'submit' <button>", () => {
                        const camerasHeading = screen.getByTestId("camerasHeading");
                        fireEvent.click(camerasHeading);
                        const submitButton = screen.getByTestId("submitButton");
                        expect(submitButton).toBeInTheDocument();
                    });
                    describe("the 'submit' <button>", () => {
                        it("filters the photos, based on the checkboxes that the User has ticked", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const fhaz = screen.getByTestId("FHAZ");
                            const rhaz = screen.getByTestId("RHAZ");
                            const navcam = screen.getByTestId("NAVCAM");
                            const pancam = screen.getByTestId("PANCAM");
                            const entry = screen.getByTestId("ENTRY");
                            const submitButton = screen.getByTestId("submitButton");
                            expect(solPhotos.length).toBe(0);
                            fireEvent.click(fhaz);
                            fireEvent.click(submitButton);
                            //simulate one FHAZ camera photo being returned
                            setSolPhotos(["FHAZ Photo"]);
                            expect(solPhotos.length).toBe(1);
                            fireEvent.click(rhaz);
                            fireEvent.click(navcam);
                            fireEvent.click(pancam);
                            fireEvent.click(entry);
                            fireEvent.click(submitButton);
                            //simulate one photo for each camera being returned
                            setSolPhotos(["FHAZ Photo", "RHAZ Photo", "NAVCAM Photo", "PANCAM Photo", "ENTRY Photo"]);
                            expect(solPhotos.length).toBe(5);
                        });
                        it("displays text in bold, black, 24px 'ZCOOL QingKe HuangYou' font", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const submitButton = screen.getByTestId("submitButton");
                            submitButton.style.cssText = mockStyles.camerasFilterInput;
                            expect(submitButton).toHaveStyle("font-weight: bold");
                            expect(submitButton).toHaveStyle("color: black");
                            expect(submitButton).toHaveStyle("font-size: 24px");
                            expect(submitButton).toHaveStyle("font-family: 'ZCOOL QingKe HuangYou', sans-serif");
                        });
                        it("has a width of 99%", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const submitButton = screen.getByTestId("submitButton");
                            submitButton.style.cssText = mockStyles.camerasFilterInput;
                            expect(submitButton).toHaveStyle("width: 99%");
                        });
                        it("has a central text alignment", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const submitButton = screen.getByTestId("submitButton");
                            submitButton.style.cssText = mockStyles.camerasFilterInput;
                            expect(submitButton).toHaveStyle("text-align: center");
                        });
                        it("has a 10px top and bottom margin", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const submitButton = screen.getByTestId("submitButton");
                            submitButton.style.cssText = mockStyles.camerasFilterInput;
                            expect(submitButton).toHaveStyle("margin-top: 10px");
                            expect(submitButton).toHaveStyle("margin-bottom: 10px");
                        });
                        it("has a left and right margin of 'auto'", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const submitButton = screen.getByTestId("submitButton");
                            submitButton.style.cssText = mockStyles.camerasFilterInput;
                            expect(submitButton).toHaveStyle("margin-left: auto");
                            expect(submitButton).toHaveStyle("margin-right: auto");
                        });
                        it("has a light grey background color", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const submitButton = screen.getByTestId("submitButton");
                            submitButton.style.cssText = mockStyles.camerasFilterInput;
                            expect(submitButton).toHaveStyle("background-color: lightgrey");
                        });
                        it("has a 3px border radius", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const submitButton = screen.getByTestId("submitButton");
                            submitButton.style.cssText = mockStyles.camerasFilterInput;
                            expect(submitButton).toHaveStyle("border-radius: 3px");
                        });
                        it("transitions to a darkslateblue background color after a 0.4s delay on hover", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const submitButton = screen.getByTestId("submitButton");
                            submitButton.addEventListener('mouseover', () => {
                                submitButton.style.cssText = mockStyles.camerasFilterInputHover;
                            });
                            fireEvent.mouseOver(submitButton);
                            expect(submitButton).toHaveStyle("background-color: darkslateblue");
                        });
                        it("transitions to a bold white font after a 0.4s delay on hover", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const submitButton = screen.getByTestId("submitButton");
                            submitButton.addEventListener('mouseover', () => {
                                submitButton.style.cssText = mockStyles.camerasFilterInputHover;
                            });
                            fireEvent.mouseOver(submitButton);
                            expect(submitButton).toHaveStyle("font-weight: bold");
                            expect(submitButton).toHaveStyle("color: white");
                        });
                        it("transitions to a 'pointer' cursor and a '2px double black' border after a 0.4s delay on hover", () => {
                            const camerasHeading = screen.getByTestId("camerasHeading");
                            fireEvent.click(camerasHeading);
                            const submitButton = screen.getByTestId("submitButton");
                            submitButton.addEventListener('mouseover', () => {
                                submitButton.style.cssText = mockStyles.camerasFilterInputHover;
                            });
                            fireEvent.mouseOver(submitButton);
                            expect(submitButton).toHaveStyle("cursor: pointer");
                            expect(submitButton).toHaveStyle("border: 2px double black");
                        });
                    });
                });
            });
        });
    });
});
