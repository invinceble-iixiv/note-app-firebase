import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';

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

const routing = (
 <Router>
   <div>
    <Redirect exact from='/' to='/login'></Redirect>
    <Route path='/login' component={LoginComponent}></Route>
    <Route path='/signup' component={SignupComponent}></Route>
    <Route path='/notes' component={App}></Route>
   </div>
 </Router>
)


ReactDOM.render(
   routing,
  document.getElementById('fire-note-container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
