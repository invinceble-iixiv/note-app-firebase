import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyAuL9RifZ6vnCzV9nMc7nyHhITAZC6ftx4",
  authDomain: "fire-note-b891c.firebaseapp.com",
  databaseURL: "https://fire-note-b891c.firebaseio.com",
  projectId: "fire-note-b891c",
  storageBucket: "fire-note-b891c.appspot.com",
  messagingSenderId: "937544811833",
  appId: "1:937544811833:web:51834e81f75dec46b794e8",
  measurementId: "G-GVF3V9MQ3W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
    <App />,
  document.getElementById('fire-note-container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
