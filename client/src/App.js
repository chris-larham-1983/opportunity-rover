//React configuration
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//pages
import IntroPage from './pages/IntroPage';
import SolSelectPage from './pages/SolSelectPage';
import SolPage from './pages/SolPage';
import FillManifestTable from './pages/FillManifestTable';
import FillPhotosTable from "./pages/FillPhotosTable";
//styling
import styles from './styling/styling.module.css';
import './App.css';

function App() {

    //set up app routes
    return (
        <Fragment>
            <Router>
                <Routes>
                    <Route exact path="/intro" element={<IntroPage />} />
                    <Route exact path="/solSelect" element={<SolSelectPage />} />
                    <Route exact path="/sols/:sol" element={<SolPage />} />
                    <Route exact path="/fillManifest" element={<FillManifestTable />} />
                    <Route exact path="/fillPhotos" element={<FillPhotosTable />} />
                    <Route path="/*" element={<Navigate to="/intro" />} />
                </Routes>
            </Router>
        </Fragment>
    );
}

//export App
export default App;
