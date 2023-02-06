//testing library setup
import { render, fireEvent, screen } from '@testing-library/react';
//React setup
import React from 'react';
//import Audio component
import Audio from './Audio';

describe("The Audio component", () => {
    //render the <Audio /> element before each test
    beforeEach(() => {
        render(<Audio />);
    });
    test("is displayed/hidden when the User clicks the 'Music' heading", () => {
        const musicHeading = screen.getByTestId("musicHeading");
        const audioControls = screen.getByTestId("audioControls");
        //don't expect the 'audioControls' <div> to be hidden initially, as it has just been rendered
        expect(audioControls.getAttribute("hidden")).toEqual("");
        //click the 'musicHeading' <h2> element and expect the 'audioControls' <div> to be hidden as a result
        fireEvent.click(musicHeading);
        expect(audioControls.getAttribute("hidden")).toEqual("hidden");
    });
    test("plays music when the User presses the 'PLAY' <button>", () => {
        const playStub = jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation( () => {});
        const playButton = screen.getByTestId("playButton");
        //click the 'PLAY' button
        fireEvent.click(playButton);
        expect(playStub).toHaveBeenCalled();
    });
    test("pauses music when the User presses the 'PAUSE' <button>", () => {
        const playStub = jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() => {});
        const pauseStub = jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
        const playButton = screen.getByTestId("playButton");
        const pauseButton = screen.getByTestId("pauseButton");
        localStorage.removeItem("playTime");
        expect(localStorage.getItem("playTime")).toBeNull();
        //click 'PLAY'
        fireEvent.click(playButton);
        expect(playStub).toHaveBeenCalled();
        //expect pauseStub not to have been called yet
        expect(pauseStub).not.toHaveBeenCalled();
        //click 'PAUSE' and expect pauseStub to have been called
        fireEvent.click(pauseButton);
        expect(pauseStub).toHaveBeenCalled();
        expect(localStorage.getItem("playTime")).not.toBeNull();
        localStorage.removeItem("playTime");
    })
    test("updates the volume level correctly", () => {
        const volumeUpButton = screen.getByTestId("volumeUpButton");
        const volumeDownButton = screen.getByTestId("volumeDownButton");
        const volumeDisplaySpan = screen.getByTestId("volumeDisplaySpan");
        //expect the initial volume to be 60%
        expect(volumeDisplaySpan.innerHTML).toEqual("60%");
        //click the volume up button and expect the volume to be 70%
        fireEvent.click(volumeUpButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("70%");
        //click the volume up button and expect the volume to be 80%
        fireEvent.click(volumeUpButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("80%");
        //click the volume up button and expect the volume to be 90%
        fireEvent.click(volumeUpButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("90%");
        //click the volume up button and expect the volume to be 100%
        fireEvent.click(volumeUpButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("100%");
        //click the volume up button and expect the volume to still be 100%
        fireEvent.click(volumeUpButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("100%");
        //click the volume down button and expect the volume to be 90%
        fireEvent.click(volumeDownButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("90%");
        //click the volume down button and expect the volume to be 80%
        fireEvent.click(volumeDownButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("80%");
        //click the volume down button and expect the volume to be 70%
        fireEvent.click(volumeDownButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("70%");
        //click the volume down button and expect the volume to be 60%
        fireEvent.click(volumeDownButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("60%");
        //click the volume down button and expect the volume to be 50%
        fireEvent.click(volumeDownButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("50%");
        //click the volume down button and expect the volume to be 40%
        fireEvent.click(volumeDownButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("40%");
        //click the volume down button and expect the volume to be 30%
        fireEvent.click(volumeDownButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("30%");
        //click the volume down button and expect the volume to be 20%
        fireEvent.click(volumeDownButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("20%");
        //click the volume down button and expect the volume to be 10%
        fireEvent.click(volumeDownButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("10%");
        //click the volume down button and expect the volume to be 0%
        fireEvent.click(volumeDownButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("0%");
        //click the volume down button and expect the volume to still be 0%
        fireEvent.click(volumeDownButton);
        expect(volumeDisplaySpan.innerHTML).toEqual("0%");
    });
});
