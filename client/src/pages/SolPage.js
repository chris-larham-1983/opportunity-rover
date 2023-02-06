//React setup
import React from 'react';
import { useParams } from 'react-router-dom';
//styling
import styles from '../styling/styling.module.css';

const SolPage = () => {

    const { sol } = useParams();

    return (
        <p>Welcome to sol {sol}, we hope you enjoy your stay!</p>
    )
};

export default SolPage;