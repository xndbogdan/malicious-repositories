import 'core-js/es/map';
import 'core-js/es/set';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Providers from './context/Providers';

const rootElement = document.getElementById('root');

  ReactDOM.render(
    <React.StrictMode>
      <Providers>
        <App />
      </Providers>
    </React.StrictMode>,
    rootElement,
  );

  // Hide loading screen and show app content when window has fully loaded
  window.onload = () => {
    rootElement.style.display = 'block';
  };

  // Disable react dev tools in production
  if (
    process.env.NODE_ENV === 'production' &&
    typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object'
  ) {
    for (let [key, value] of Object.entries(
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__,
    )) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
        typeof value == 'function' ? () => {} : null;
    }
  }