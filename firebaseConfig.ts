// Import the functions you need from the SDKs you need
// Make sure to use the 'compat' version for the scripts added in index.html
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// --- IMPORTANT ---
// TODO: You MUST replace these placeholder values with your own Firebase configuration
// from your Firebase project console. The sign-in and watchlist features will NOT
// work until you do this.
const firebaseConfig = {
  apiKey: "AIzaSyDsNr-_9bzVUPWUC7eFglpnu_V3pBtipKI", // This is your API key
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();