import React from 'react';
import ReactDOM from 'react-dom';
import App from './components';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';
import './index.scss';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY || 'FIREBASE_API_KEY',
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || 'FIREBASE_AUTH_DOMAIN',
  databaseURL: process.env.REACT_APP_DATABASE_URL || 'FIREBASE_DATABASE_URL',
  projectId: process.env.REACT_APP_PROJECT_ID || 'FIREBASE_PROJECT_ID',
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || 'FIREBASE_STORAGE_BUCKET',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || 'FIREBASE_MESSAGING_SENDER_ID'
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
