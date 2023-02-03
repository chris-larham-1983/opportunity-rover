//React setup
import React, { useRef, useState } from 'react';
//styling
import styles from '../../styling/styling.module.css';

const PageTraversal = () => {

    //variable and setter that defines the User's desired sol
    const [sol, setSol] = useState(0);
    //reference to sol number input
    const desiredSol = useRef(null);

    //function to update sol if appropriate input is detected
    const handleChange = () => {
            let tempSol = Number(desiredSol.current.value);
            if(tempSol > 0 && tempSol <= 5111) {
                setSol(tempSol);
            }
    };

    //function triggered by clicking the 'Traverse Page' <button> in the 'pageTraversal' <div>
    const traversePage = () => {
            //let the 'solLink' variable refer to the element in the document whose id attribute is the String equivalent of 'sol'
            let solLink = document.getElementById(sol.toString());
            //if 'solButton' refers to an actual element (and thus doesn't return a 'falsy' value)
            if(solLink) {
                //scroll solButton into view
                window.location.href = "#" + sol;
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
                    onClick={traversePage}>
                Traverse Page
            </button>
        </div>
    )
};

export default PageTraversal;