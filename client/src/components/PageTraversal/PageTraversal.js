//React setup
import React, { useRef, useState } from 'react';
//styling
import styles from '../../styling/styling.module.css';

const PageTraversal = ({ navigateToSol }) => {

    //variable and setter that defines the User's desired sol
    const [sol, setSol] = useState(1);
    //reference to sol number input
    const desiredSol = useRef(null);

    //function to update sol if appropriate input is detected
    const handleChange = () => {
            let tempSol = parseInt(desiredSol.current.value);
            if(tempSol >= 1 && tempSol <= 5111) {
                setSol(tempSol);
            }
    };

    //function triggered by clicking the 'Traverse Page' <button> in the 'pageTraversal' <div>
    const traversePage = () => {
            //let the 'solLink' variable refer to the element in the document whose id attribute is the String equivalent of 'sol'
            let solLink = document.getElementById(sol.toString());
            //if 'solLink' refers to an actual element (and thus doesn't return a 'falsy' value)
            if(solLink) {
                //scroll solButton into view
                window.location.href = `#${sol}`;
            } else {
                //if 'sol' is less than 5111 (the setSol function is only called if the input sol is between 1 and 5111)
                if(sol < 5111) {
                    let tempSol = sol;
                    //while there is no link for the chosen sol
                    while(!solLink && tempSol < 5111) {
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
                   placeholder="Enter Sol [1 - 5111]..."
                   min="1"
                   max="5111"
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