import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import {AuthProvider} from "./Autorizacao/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider>
    <App />
      </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
