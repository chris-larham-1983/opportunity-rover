//React setup
import React, { useRef, useState } from 'react';
//styling
import styles from '../../styling/styling.module.css';

const PageTraversal = ({ navigateToSol, lastLoaded, min }) => {

    //variable and setter that defines the User's desired sol
    const [sol, setSol] = useState(min);
    //reference to sol number input
    const desiredSol = useRef(null);

    //function to update sol if appropriate input is detected
    const handleChange = () => {
        let tempSol = parseInt(desiredSol.current.value);
        if(tempSol >= min && tempSol <= lastLoaded) {
            setSol(tempSol);
        }
    };

    //function triggered by clicking the 'Traverse Page' <button> in the 'pageTraversal' <div>
    const traversePage = () => {
        //let the 'solLink' variable refer to the element in the document whose id attribute is the String equivalent of 'sol'
        let solLink = document.getElementById(sol.toString());
        //if 'solLink' refers to an actual element (and thus doesn't return a 'falsy' value)
        if(solLink) {
            //scroll solLink into view
            window.location.href = `#${sol}`;
        } else {
            //if 'sol' is greater than 'min' and less than 'lastLoaded' (the setSol function is only called if the input sol is between min and lastLoaded)
            if(sol >= min && sol < lastLoaded) {
                let tempSol = sol;
                //while there is no link for the chosen sol and tempSol is less than lastLoaded
                while(!solLink && tempSol < lastLoaded) {
                    tempSol += 1;
                    solLink = document.getElementById(tempSol.toString());
                    //update sol by 1
                    setSol(tempSol);
                }
                //scroll the nearest sol into view
                window.location.href = `#${tempSol}`;
            }
        }
    };

    return (
        <div data-testid="pageTraversal" id="pageTraversal" className={styles.pageTraversal}>
            <input data-testid="desiredSol"
                   ref={desiredSol}
                   onChange={handleChange}
                   className={styles.desiredSol}
                   type="number"
                   placeholder={`Enter Sol [${min} - ${lastLoaded}]...`}
                   min={`${min}`}
                   max={`${lastLoaded}`}
            />
            <button data-testid="navigateToSol"
                    className={styles.navigateToSol}
                    onClick={traversePage}
                    ref={navigateToSol} >
                Traverse Page
            </button>
        </div>
    )
};

export default PageTraversal;