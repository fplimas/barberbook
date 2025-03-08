import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Se você quiser que seu aplicativo funcione offline e carregue mais rápido, você pode
// mudar unregister() para register() abaixo. Observe que isso traz algumas armadilhas.
// Saiba mais sobre service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
