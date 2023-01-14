//React setup
import React from 'react';
//styling
import styles from '../styling/styling.module.css';

//define the presentation of a simple <Footer /> component
const Footer = () => {
    return (
        <footer className={styles.footerStyles}>
            <p className={styles.footerParaStyles}>MARTIAN IMAGES - Website design by Chris Larham, &copy; 2023</p>
        </footer>
    )
};

export default Footer; //export the <Footer /> component