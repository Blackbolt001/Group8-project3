import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import background from "./public/pexels-pixmike-413195.jpg"

ReactDOM.render(
  <React.StrictMode>
    <App
      style={{
        backgroundImage: `url(https://media.geeksforgeeks.org/wp-content/uploads/rk.png)`
      }}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
