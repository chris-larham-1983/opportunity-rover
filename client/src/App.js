//React configuration
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//pages
import IntroPage from './pages/IntroPage';
import SolSelectPage from './pages/SolSelectPage';
import SolPage from './pages/SolPage';
//styling
import styles from './styling/styling.module.css';
import './App.css';

function App() {

    //set up app routes
    return (
        <div className={styles.bodyStyles}>
            <Router>
                <Routes>
                    <Route exact path="/intro" element={<IntroPage />} />
                    <Route exact path="/solSelect" element={<SolSelectPage />} />
                    <Route exact path="/sols/:sol" element={<SolPage />} />
                    <Route path="/*" element={<Navigate to="/intro" />} />
                </Routes>
            </Router>
        </div>
    );
}

//export App
export default App;