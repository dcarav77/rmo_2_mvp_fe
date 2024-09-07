import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Optional: if you want to include global styles
import App from './App';  // Import the App component

// Create a root element and render the App component inside the root div in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
