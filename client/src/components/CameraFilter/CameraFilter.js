//React setup
import React, { useRef, useState } from 'react';
//styling
import styles from '../../styling/styling.module.css';
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCamera, faCameraRetro, faHandPointRight, faWandMagicSparkles} from '@fortawesome/free-solid-svg-icons';

const CameraFilter = ({ sol, cameras, setSolPhotos, setSlideIndex, setSlideNumber }) => {

    //camera-filtering variable
    let requestParameter = "";

    //function that responds to the user clicking the 'FILTER BY CAMERAS' <button>
    const handleSubmit = async (e) => {
        //prevent default form behaviour
        e.preventDefault();
        //reset requestParameter if it exists already
        requestParameter = "";
        //build a new requestParameter
        if(fhazIsChecked) {
            requestParameter += "Front_Hazard_Avoidance_Camera";
        }
        if(requestParameter.length && rhazIsChecked) {
            requestParameter += "*Rear_Hazard_Avoidance_Camera";
        } else if(rhazIsChecked) {
            requestParameter += "Rear_Hazard_Avoidance_Camera";
        }
        if(requestParameter.length && navcamIsChecked) {
            requestParameter += "*Navigation_Camera";
        } else if(navcamIsChecked) {
            requestParameter += "Navigation_Camera";
        }
        if(requestParameter.length && pancamIsChecked) {
            requestParameter += "*Panoramic_Camera";
        } else if(pancamIsChecked) {
            requestParameter += "Panoramic_Camera";
        }
        if(requestParameter.length && minitesIsChecked) {
            requestParameter += "*Miniature_Thermal_Emission_Spectrometer_(Mini-TES)";
        } else if(minitesIsChecked) {
            requestParameter += "Miniature_Thermal_Emission_Spectrometer_(Mini-TES)";
        }
        if(requestParameter.length && entryIsChecked) {
            requestParameter += "*Entry,_Descent,_and_Landing_Camera";
        } else if(entryIsChecked) {
            requestParameter += "Entry,_Descent,_and_Landing_Camera";
        }
        //update the solPhotos only if at least one camera has been selected
        if(requestParameter.length) {
            try {
                const updateSolPhotos = await fetch(`/photos/${sol}/filterByCameras/${requestParameter}`, {
                    method: 'GET'
                });
                const updatedSolPhotos = await updateSolPhotos.json();
                await setSlideIndex(0);
                await setSlideNumber(1);
                setSolPhotos(updatedSolPhotos);
            } catch(err) {
                console.log(`${err.message}`);
            }
        }
    }

    const [showCameras, setShowCameras] = useState(false);
    const [fhazIsChecked, setFhazIsChecked] = useState(false);
    const [rhazIsChecked, setRhazIsChecked] = useState(false);
    const [navcamIsChecked, setNavcamIsChecked] = useState(false);
    const [pancamIsChecked, setPancamIsChecked] = useState(false);
    const [minitesIsChecked, setMinitesIsChecked] = useState(false);
    const [entryIsChecked, setEntryIsChecked] = useState(false);

    const camerasDiv = useRef(null);
    let camerasDivTimer;
    const toggleCamerasFilter = () => {
        let showCameraDiv = !showCameras;
        setShowCameras(showCameraDiv);
        if(showCameraDiv) {
            camerasDivTimer = setTimeout(() => {
                camerasDiv.current.scrollIntoView(false);
            }, 125);
        }
    };

    const updateCameras = (e) => {
        switch(e.target.name) {
            case 'FHAZ':
                setFhazIsChecked(!fhazIsChecked);
                break;
            case 'RHAZ':
                setRhazIsChecked(!rhazIsChecked);
                break;
            case 'NAVCAM':
                setNavcamIsChecked(!navcamIsChecked);
                break;
            case 'PANCAM':
                setPancamIsChecked(!pancamIsChecked);
                break;
            case 'MINITES':
                setMinitesIsChecked(!minitesIsChecked);
                break;
            case 'ENTRY':
                setEntryIsChecked(!entryIsChecked);
                break;
        }
    };

    return (
        <div className={styles.marsTableCell} data-testid="marsTableCell">
            <h2 className={styles.camerasHeading} onClick={toggleCamerasFilter} data-testid="camerasHeading">
                <FontAwesomeIcon icon={ faHandPointRight } /> <FontAwesomeIcon icon={ faCamera } /> Filter By Camera +/- <FontAwesomeIcon icon={ faCameraRetro } />
            </h2>
            {showCameras &&
                <div className={styles.camerasFilter} ref={camerasDiv} data-testid="camerasDiv">
                    <form onSubmit={handleSubmit} data-testid="camerasForm">
                        {cameras.map((camera, index) => {
                            switch(camera) {
                                case 'FHAZ':
                                    return (
                                        <label className={styles.camerasLabel} key={index} htmlFor="FHAZ" data-testid="label">FHAZ
                                            <input className={styles.camerasCheckbox} type="checkbox" id="FHAZ" name="FHAZ" value="FHAZ" checked={fhazIsChecked} onChange={e => updateCameras(e)} data-testid="FHAZ" />
                                        </label>
                                    );
                                case 'RHAZ':
                                    return (
                                        <label className={styles.camerasLabel} key={index} htmlFor="RHAZ">RHAZ
                                            <input className={styles.camerasCheckbox} type="checkbox" id="RHAZ" name="RHAZ" value="RHAZ" checked={rhazIsChecked} onChange={e => updateCameras(e)} data-testid="RHAZ" />
                                        </label>
                                    );
                                case 'NAVCAM':
                                    return (
                                        <label className={styles.camerasLabel} key={index} htmlFor="NAVCAM">NAVCAM
                                            <input className={styles.camerasCheckbox} type="checkbox" id="NAVCAM" name="NAVCAM" value="NAVCAM" checked={navcamIsChecked} onChange={e => updateCameras(e)} data-testid="NAVCAM" />
                                        </label>
                                    );
                                case 'PANCAM':
                                    return (
                                        <label className={styles.camerasLabel} key={index} htmlFor="PANCAM">PANCAM
                                            <input className={styles.camerasCheckbox} type="checkbox" id="PANCAM" name="PANCAM" value="PANCAM" checked={pancamIsChecked} onChange={e => updateCameras(e)} data-testid="PANCAM" />
                                        </label>
                                    );
                                case 'MINITES':
                                    return (
                                        <label className={styles.camerasLabel} key={index} htmlFor="MINITES">MINITES
                                            <input className={styles.camerasCheckbox} type="checkbox" id="MINITES" name="MINITES" value="MINITES" checked={minitesIsChecked} onChange={e => updateCameras(e)} data-testid="MINITES" />
                                        </label>
                                    );
                                case 'ENTRY':
                                    return (
                                        <label className={styles.camerasLabel} key={index} htmlFor="ENTRY">ENTRY
                                            <input className={styles.camerasCheckbox} type="checkbox" id="ENTRY" name="ENTRY" value="ENTRY" checked={entryIsChecked} onChange={e => updateCameras(e)} data-testid="ENTRY" />
                                        </label>
                                    );
                            }
                        })}
                        {showCameras &&
                            <input className={styles.camerasFilterInput} type="submit" value="FILTER BY CAMERA" data-testid="submitButton" />}
                    </form>
                </div>
            }
        </div>
    )
};

export default CameraFilter;