import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import 'firebase/compat/analytics';

var firebaseConfig = {
  apiKey: 'AIzaSyBRpDZ63mVfrzmzTjHFjRssP4cOvw_jc04',
  authDomain: 'chat-app-c975a.firebaseapp.com',
  projectId: 'chat-app-c975a',
  storageBucket: 'chat-app-c975a.appspot.com',
  messagingSenderId: '942648297216',
  appId: '1:942648297216:web:d8c4321ba778c8808f95e5',
  measurementId: 'G-01WLMKYFFM',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === 'localhost') {
  // auth.useEmulator('http://localhost:9099');
  // db.useEmulator('localhost', '8080');
}

export { db, auth };
export default firebase