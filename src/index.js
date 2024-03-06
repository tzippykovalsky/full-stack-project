import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
// let html=require('./chat2.html')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <GoogleOAuthProvider clientId="95169824140-nr2dkbn3nutbjt62fqljk70fjrquber7.apps.googleusercontent.com">
  <React.StrictMode> 
     <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter> 
     </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
