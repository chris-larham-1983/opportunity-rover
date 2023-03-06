//React setup
import React, { useState } from 'react';
//styling
import styles from '../../styling/styling.module.css';

const CameraFilter = ({ sol, cameras, setSolPhotos }) => {

    let requestParameter = "";
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
                const updateSolPhotos = await fetch(`photos/${sol}/filterByCameras/${requestParameter}`, {
                    method: 'GET'
                });
                const updatedSolPhotos = await updateSolPhotos.json();
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
        <div className={styles.marsTableCell}>
            <h2>Filter By Camera</h2>
            <form onSubmit={handleSubmit}>
                {cameras.map((camera, index) => {
                    switch(camera) {
                        case 'FHAZ':
                            return (
                                <label key={index} htmlFor="FHAZ">FHAZ
                                    <input type="checkbox" id="FHAZ" name="FHAZ" value="FHAZ" checked={fhazIsChecked} onChange={e => updateCameras(e)}/>
                                </label>
                            );
                        case 'RHAZ':
                            return (
                                <label key={index} htmlFor="RHAZ">RHAZ
                                    <input type="checkbox" id="RHAZ" name="RHAZ" value="RHAZ" checked={rhazIsChecked} onChange={e => updateCameras(e)}/>
                                </label>
                            );
                        case 'NAVCAM':
                            return (
                                <label key={index} htmlFor="NAVCAM">NAVCAM
                                    <input type="checkbox" id="NAVCAM" name="NAVCAM" value="NAVCAM" checked={navcamIsChecked} onChange={e => updateCameras(e)}/>
                                </label>
                            );
                        case 'PANCAM':
                            return (
                                <label key={index} htmlFor="PANCAM">PANCAM
                                    <input type="checkbox" id="PANCAM" name="PANCAM" value="PANCAM" checked={pancamIsChecked} onChange={e => updateCameras(e)}/>
                                </label>
                            );
                        case 'MINITES':
                            return (
                                <label key={index} htmlFor="MINITES">MINITES
                                    <input type="checkbox" id="MINITES" name="MINITES" value="MINITES" checked={minitesIsChecked} onChange={e => updateCameras(e)}/>
                                </label>
                            );
                        case 'ENTRY':
                            return (
                                <label key={index} htmlFor="ENTRY">ENTRY
                                    <input type="checkbox" id="ENTRY" name="ENTRY" value="ENTRY" checked={entryIsChecked} onChange={e => updateCameras(e)}/>
                                </label>
                            );
                    }
                })}
                <input type="submit" value="FILTER BY CAMERA" />
            </form>
        </div>
    )
};

export default CameraFilter;