import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AppProvider} from './context/context';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
  , document.getElementById('root')
);