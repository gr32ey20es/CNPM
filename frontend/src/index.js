import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NopTien from './noptien/NopTien'
import { AppContextProvider } from './noptien/AppContext/AppContext';
ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
    <NopTien/>
    </AppContextProvider>
   
  </React.StrictMode>,
  document.getElementById('root')
);