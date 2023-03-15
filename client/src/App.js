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
                    <Route exact path="/solSelect" element={<SolSelectPage page={1} />} />
                    <Route exact path="/solSelect2" element={<SolSelectPage page={2} />} />
                    <Route exact path="/solSelect3" element={<SolSelectPage page={3} />} />
                    <Route exact path="/solSelect4" element={<SolSelectPage page={4} />} />
                    <Route exact path="/solSelect5" element={<SolSelectPage page={5} />} />
                    <Route exact path="/solSelect6" element={<SolSelectPage page={6} />} />
                    <Route exact path="/solSelect7" element={<SolSelectPage page={7} />} />
                    <Route exact path="/solSelect8" element={<SolSelectPage page={8} />} />
                    <Route exact path="/solSelect9" element={<SolSelectPage page={9} />} />
                    <Route exact path="/solSelect10" element={<SolSelectPage page={10} />} />
                    <Route exact path="/sols/:sol" element={<SolPage />} />
                    <Route path="/*" element={<Navigate to="/intro" />} />
                </Routes>
            </Router>
        </div>
    );
}

//export App
export default App;