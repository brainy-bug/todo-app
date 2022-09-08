// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

// Import styles
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// Import App component
import App from './Components/App';

// Render App Component
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
