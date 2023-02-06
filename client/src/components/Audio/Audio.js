//React setup
import React, { useEffect } from 'react';
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeDown, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
//styling
import styles from '../../styling/styling.module.css';
//music
import opportunity_music from '../../audio/mars_rover_music.mp3';

const Audio = () => {

    //page load logic
    useEffect(() => {
        //add a 'visibilitychange' event listener to the document that will invoke the 'hiddenOrShown()' function when fired
        document.addEventListener("visibilitychange", hiddenOrShown);
        //add a 'pageshow' event listener to the window object that will invoke the 'showProgress()' function when fired
        window.addEventListener("pageshow", showProgress);
        //add a 'pagehide' event listener to the window object that will invoke the 'saveAudio()' function when fired
        window.addEventListener("pagehide", saveAudio);
        showProgress();
    }, []);

    //variable that refers to the 'audioControls' container
    let audioControls = document.getElementById("audioControls");
    //variable that will be initialized to refer to the 'musicPlayer' <audio> element
    let musicPlayer;
    //variable that will be initialized to refer to the 'volumeDisplay' <span> element
    let volumeDisplay;
    //variable that will be initialized to refer to the 'musicalProgress' <progress> element
    let musicalProgress;
    //variable that will be initialized to refer to the 'musicalPercentage' <p> element
    let musicalPercentage;

    //variable that will store the User's 'preferredVolume'
    let preferredVolume;
    //variable that keeps track of whether there is 'musicPlaying'
    let musicPlaying = false;
    //variable that will keep track of the 'currentTime' of the 'musicPlayer'
    let playTime;
    //variable that will store a String-ified boolean representation of whether the User wants the music playing (either "true" or "false")
    let userWantsMusic;
    //variable that will keep track of the musical progress [identical to 'playTime']
    let progressValue;
    //variable that represents the length in seconds ['duration'] of the mp3 played in the 'musicPlayer'
    let progressMax = 1625;
    //variable that will represent the musical progress as a percentage
    let progressPercent;

    //function to toggle the audio controls' display
    const toggleDisplay = () => {
        if(audioControls) {
            if(audioControls.getAttribute("hidden")) {
                audioControls.removeAttribute("hidden");
            } else {
                audioControls.setAttribute("hidden", "hidden");
            }
        } else {
            audioControls = document.getElementById("audioControls");
            if(audioControls.getAttribute("hidden")) {
                audioControls.removeAttribute("hidden");
            } else {
                audioControls.setAttribute("hidden", "hidden");
            }
        }
    };

    //function invoked when the document experiences a change in visibility
    const hiddenOrShown = () => {
        //if the document is a background tab or part of a minimized window, or the OS screen lock is active
        if(document.visibilityState === "hidden") {
            //invoke the 'saveAudio()' function
            saveAudio();
        }
        //otherwise, if the document is the foreground tab of a non-minimized window
        else if(document.visibilityState === "visible") {
            //invoke the 'showProgress()' function
            showProgress();
        }
    };

    //function triggered when the document's visibilityState changes to 'hidden' and when the 'pagehide' event fires
    const saveAudio = () => {
        //if there was 'musicPlaying' as the document's visibilityState changed to 'hidden'
        if(musicPlaying) {
            //pause the music
            musicPlayer.pause();
            //set 'musicPlaying' to false
            musicPlaying = false;
            //set the page variable 'playTime' to the current track time of the 'musicPlayer'
            playTime = musicPlayer.currentTime;
            //save the value of the 'playTime' page variable in localStorage
            localStorage.setItem("playTime", playTime.toString());
        }
    };

    //function triggered when 'audioControls' is no longer hidden || the document has become 'visible' as a result of the 'visibilityChange' event || the 'pageshow' event fires
    const showProgress = () => {
        //if the variable 'playTime' - and, implicitly, the 'preferredVolume' and 'userWantsMusic' variables - DOES exist in localStorage...
        if(localStorage.getItem("playTime")) {
            //if 'musicPlayer' equates to a 'falsy' value (i.e. it hasn't yet been initialized - and, therefore, neither have the 'musicalProgress', 'musicalPercentage', or 'volumeDisplay' variables)
            if(!musicPlayer) {
                //make the 'musicPlayer' variable refer to the 'musicPlayer' <audio> element
                musicPlayer = document.getElementById("musicPlayer");
                //make the 'musicalProgress' variable refer to the 'musicalProgress' <progress> element
                musicalProgress = document.getElementById("musicalProgress");
                //make the 'musicalPercentage' variable refer to the 'musicalPercentage' <p> element
                musicalPercentage = document.getElementById("musicalPercentage");
                //make the 'volumeDisplay' variable refer to the 'volumeDisplay' <span> element
                volumeDisplay = document.getElementById("volumeDisplay");
            }
            //set the 'playTime' page variable equal to the numerical equivalent of the string 'playTime' value stored locally
            playTime = Number(localStorage.getItem("playTime"));
            //set the 'preferredVolume' page variable equal to the numerical equivalent of the string 'preferredVolume' value stored locally
            preferredVolume = Number(localStorage.getItem("preferredVolume"));
            //set the 'currentTime' property of 'musicPlayer' equal to 'playTime'
            musicPlayer.currentTime = playTime;
            //set the 'volume' property of 'musicPlayer' equal to 'preferredVolume'
            musicPlayer.volume = preferredVolume;
            //update the 'volumeDisplay' paragraph for the User's benefit, displaying the current volume as a percentage of the 'musicPlayer' maximum
            volumeDisplay.innerHTML = `${Math.round(preferredVolume * 100)}%`;
            //set the 'max' attribute of the 'musicalProgress' <progress> element equal to 'progressMax'
            musicalProgress.max = progressMax;
            //... set the 'progressValue' page variable equal to the numerical equivalent of the string 'playTime' variable stored in localStorage [i.e. equal to the 'playTime' page variable]
            progressValue = Number(localStorage.getItem("playTime"));
            //set the 'value' attribute of the 'musicalProgress' element equal to 'progressValue'
            musicalProgress.value = progressValue;
            //set the 'progressPercent' variable equal to the rounded integer representation of ((musicalProgress.value)/(musicalProgress.max))*100
            progressPercent = Math.round(musicalProgress.position * 100);
            //display the 'progressPercent' in the 'musicalPercentage' <p> element, as well as displaying the musicPlayer's 'currentTime' in MM:SS format
            musicalPercentage.innerHTML = `MUSICAL PROGRESS: ${progressPercent}% ${displayMinsAndSecs(Math.round(progressValue))}`;
            //set the 'userWantsMusic' page variable equal to the String-ified boolean variable stored locally
            userWantsMusic = localStorage.getItem("userWantsMusic");
            //if the User has previously indicated that s/he wants music playing
            if(userWantsMusic === "true") {
                try {
                    //try to invoke the playAudio() function
                    playAudio();
                }
                //if the current context disallows musical autoplay, catch and ignore the error...
                catch(ignore) {
                }
            }
        }
        //if the variable 'playTime' (and, therefore, the 'preferredVolume' variable) does NOT exist in localStorage...
        else {
            //if 'musicPlayer' equates to a 'falsy' value
            if(!musicPlayer) {
                //make the 'musicPlayer' variable refer to the 'musicPlayer' <audio> element
                musicPlayer = document.getElementById("musicPlayer");
                //make the 'musicalProgress' variable refer to the 'musicProgress' <progress> element
                musicalProgress = document.getElementById("musicalProgress");
                //make the 'musicalPercentage' variable refer to the 'musicalPercentage' <p> element
                musicalPercentage = document.getElementById("musicalPercentage");
                //make the 'volumeDisplay' variable refer to the 'volumeDisplay' <p> element
                volumeDisplay = document.getElementById("volumeDisplay");
            }
            //set the 'progressValue' page variable equal to the String representation of numeric 0
            progressValue = "0";
            //set the 'preferredVolume' page variable to 0.6
            preferredVolume = 0.6;
            //set the 'playTime' page variable to 0
            playTime = 0;
            //set a 'playTime' variable in localStorage, with the string value of "0"
            localStorage.setItem("playTime", playTime.toString());
            //set a 'preferredVolume' variable in localStorage, with the string value of "0.6"
            localStorage.setItem("preferredVolume", preferredVolume.toString());
            //set the 'currentTime' property of 'musicPlayer' equal to 'playTime'
            musicPlayer.currentTime = playTime;
            //set the 'volume' property of 'musicPlayer' equal to 'preferredVolume'
            musicPlayer.volume = preferredVolume;
            //update the 'volumeDisplay' paragraph for the user's benefit, displaying the current volume as a percentage of the 'musicPlayer' maximum
            volumeDisplay.innerHTML = `${Math.round(preferredVolume * 100)}%`;
            //set the 'max' attribute of the 'musicalProgress' element equal to 'progressMax'
            musicalProgress.max = progressMax;
            //set the 'value' attribute of the 'musicalProgress' element equal to 'progressValue'
            musicalProgress.value = progressValue;
            //set the 'progressPercent' variable equal to numeric zero
            progressPercent = 0;
            //display the 'progressPercent' in the 'musicalPercentage' paragraph, as well as displaying the musicPlayer's 'currentTime' in MM:SS format
            musicalPercentage.innerHTML = `MUSICAL PROGRESS: ${progressPercent}% ${displayMinsAndSecs(0)}`;
            //set the 'userWantsMusic' page variable to "false", since the User has not yet indicated that s/he wants music playing
            userWantsMusic = "false";
        }
    };

    //function called from within the 'updateMusicalProgress()' function && the 'showProgress()' function; returns the musical progress in MM:SS format
    const displayMinsAndSecs = progressValue => {
        //if the musicPlayer's 'currentTime' is less than sixty seconds
        if(progressValue < 60) {
            //if the musicPlayer's 'currentTime' is less than ten seconds
            if(progressValue < 10) {
                //prefix 'progressValue' with a 0
                progressValue = `0${progressValue}`;
            }
            //return a string in 00:SS format
            return `00:${progressValue}`;
        }
        //otherwise, if the musicPlayer's 'currentTime' is less than ten minutes [six hundred seconds]
        else if(progressValue < 600) {
            //let 'mins' represent the rounded-down result of 'progressValue' divided by 60
            let mins = Math.floor(progressValue/60);
            //let 'secs' represent the remainder of 'progressValue' divided by 60
            let secs = progressValue % 60;
            //if 'secs' is less than 10
            if(secs < 10) {
                //prefix 'secs' with a 0
                secs = `0${secs}`;
            }
            //return a string in 0M:SS format
            return `0${mins}:${secs}`;
        }
        //lastly, the musicPlayer's 'currentTime' is at least 600 [ten minutes]
        else {
            //let 'mins' represent the rounded-down result of 'progressValue' divided by 60
            let mins = Math.floor(progressValue/60);
            //let 'secs' represent the remainder of 'progressValue' divided by 60
            let secs = progressValue % 60;
            //if 'secs' is less than 10
            if(secs < 10) {
                //prefix 'secs' with a 0
                secs = `0${secs}`;
            }
            //return a string in MM:SS format
            return `${mins.toString()}:${secs}`;
        }
    };

    //function triggered when the user clicks the 'PLAY' button
    const playAudio = () => {
        //if there is no 'musicPlaying'
        if(!musicPlaying) {
            //begin playing music from the same point in the 27-minute-5-second track that it was last played at, and at the User's preferred volume
            musicPlayer.play();
            //set the 'musicPlaying' page variable to TRUE
            musicPlaying = true;
            //set the 'userWantsMusic' variable to 'true', since the User wants music playing
            userWantsMusic = "true";
            //set a variable called 'userWantsMusic' to 'true' in local storage
            localStorage.setItem("userWantsMusic", "true");
            //call the 'updateMusicalProgress()' function
            updateMusicalProgress();
        }
    };

    //function called from within the 'playAudio()' function after music has begun playing
    const updateMusicalProgress = () => {
        //check to see if there is 'musicPlaying' -- this will return FALSE after the User clicks the 'PAUSE' button
        if(musicPlaying) {
            //set the 'progressValue' page variable equal to the 'currentTime' of the 'musicPlayer'
            progressValue = musicPlayer.currentTime;
            //set the 'value' property of the 'musicalProgress' <progress> element equal to 'progressValue'
            musicalProgress.value = progressValue;
            //set the value of the 'progressPercent' page variable equal to the rounded integer representation of ((musicalProgress.value)/(musicalProgress.max))*100
            progressPercent = (musicalProgress.position) * 100;
            //display the 'progressPercent' as a rounded-down integer in the 'musicalPercentage' paragraph, plus show the musical progress in MM:SS format
            musicalPercentage.innerHTML =  "MUSICAL PROGRESS: " + Math.floor(progressPercent) + "% " + displayMinsAndSecs(Math.round(progressValue));
            //if the 'currentTime' of the 'musicPlayer' indicates that the track has finished...
            if(progressValue >= progressMax) {
                //pause the music
                musicPlayer.pause();
                //set the 'playTime' page variable to 0
                playTime = 0;
                //set the 'currentTime' property of the 'musicPlayer' equal to 'playTime'
                musicPlayer.currentTime = playTime;
                //play the music again from the beginning
                musicPlayer.play();
            }
            //invoke the 'updateMusicalProgress()' method after a delay of one second
            setTimeout(updateMusicalProgress, 1000);
        }
    };

    //function triggered when the user clicks the 'PAUSE' button
    const pauseAudio = () => {
        //if there is music playing...
        if(musicPlaying) {
            //pause the music
            musicPlayer.pause();
            //set 'musicPlaying' to FALSE
            musicPlaying = false;
            //set the 'userWantsMusic' variable to 'false', since the User does not want music playing
            userWantsMusic = "false";
            //set a variable called 'userWantsMusic' to 'false' in local storage
            localStorage.setItem("userWantsMusic", "false");
            //set the page variable 'playTime' to the current track time of the 'musicPlayer'
            playTime = musicPlayer.currentTime;
            //save the value of the 'playTime' page variable in localStorage
            localStorage.setItem("playTime", playTime.toString());
        }
    };

    //function triggered when the user clicks the '+' button
    const volumeUp = () => {
        //if volume is less than the maximum...
        if(preferredVolume <= 0.9) {
            //increase the volume by a tenth of the maximum
            preferredVolume += 0.1;
            //set the volume of the 'musicPlayer' to the new 'preferredVolume'
            musicPlayer.volume = preferredVolume;
            //update the 'volumeDisplay' <p> element
            volumeDisplay.innerHTML = `${Math.round((preferredVolume * 100))}%`;
            //store the new 'preferredVolume' in localStorage
            localStorage.setItem("preferredVolume", preferredVolume.toString());
        }
    };

    //function triggered when the user clicks the '-' button
    const volumeDown = () => {
        //if the volume is not muted...
        if(preferredVolume >= 0.1) {
            //decrease the volume by a tenth of the maximum
            preferredVolume -= 0.1;
            //set the volume of the 'musicPlayer' to the new 'preferredVolume'
            musicPlayer.volume = preferredVolume;
            //update the 'volumeDisplay' <p> element
            volumeDisplay.innerHTML = `${Math.round((preferredVolume * 100))}%`;
            //store the new 'preferredVolume' in localStorage
            localStorage.setItem("preferredVolume", preferredVolume.toString());
        }
    };


    return (
        <div className="audioContainer">
            <h2 className={styles.musicHeading} data-testid="musicHeading" onClick={toggleDisplay}>&#9834; &#9835; Music +/- &#9835; &#9834;</h2>
            <div className={styles.audioControls} data-testid="audioControls" id="audioControls" hidden="hidden">
                <audio id="musicPlayer" className={styles.musicPlayer}>
                    <source src={opportunity_music} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                </audio>
                <button className={styles.audio1}
                        data-testid="playButton"
                        onClick={playAudio}>
                    PLAY<br/>
                    <span className={styles.play}>&#9658;</span>
                </button>
                <button className={styles.audio2}
                        data-testid="pauseButton"
                        onClick={pauseAudio}>
                    PAUSE<br/>
                    <span className={styles.stop}>||</span>
                </button>
                <button className={styles.audio3}
                        data-testid="volumeUpButton"
                        onClick={volumeUp}>
                    <FontAwesomeIcon icon={faVolumeUp} /><br/>
                    <span className={styles.volumeUp}>&#x2b;</span>
                </button>
                <button className={styles.audio4}
                        data-testid="volumeDownButton"
                        onClick={volumeDown}>
                    <FontAwesomeIcon icon={faVolumeDown} /><br/>
                    <span className={styles.volumeDown}>&minus;</span>
                </button>
                <p className={styles.audio5}>
                    <FontAwesomeIcon icon={faVolumeHigh} /><br/>
                    <span id="volumeDisplay" data-testid="volumeDisplaySpan"></span>
                </p>
                <div className={styles.progress}>
                    <progress className={styles.musicalProgress} id="musicalProgress"></progress>
                    <p id="musicalPercentage" className={styles.percentage}></p>
                    <p className={styles.musicCredit}><strong>Inspiring music credit:</strong> <em>AShamaluevMusic</em> <strong>https://www.ashamaluevmusic.com/</strong></p>
                </div>
            </div>
        </div>
    )
};

export default Audio;