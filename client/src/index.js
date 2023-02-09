import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Audio from './components/Audio/Audio';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Audio />
      <App />
  </React.StrictMode>
);


