import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; /** for authenticate user when log in */
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAcMnSh0hEzbO1fTlPjC1c8LC6gbfdobmM',
  authDomain: 'instagramclone-ceb9d.firebaseapp.com',
  projectId: 'instagramclone-ceb9d',
  storageBucket: 'instagramclone-ceb9d.appspot.com',
  messagingSenderId: '104483763768',
  appId: '1:104483763768:web:3e0715fc4a2cebe88218cd',
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export {firebase, db};
