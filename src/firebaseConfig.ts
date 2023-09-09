import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCM1PSwkeNb5HiqhIeXvrF3wtkijFHOHTE",
  authDomain: "dude-media.firebaseapp.com",
  projectId: "dude-media",
  storageBucket: "dude-media.appspot.com",
  messagingSenderId: "594826717577",
  appId: "1:594826717577:web:7f845924d106e39c77d958",
  measurementId: "G-3FGXQSRGB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Authentication
const auth = getAuth();
// Init services
const db = getFirestore(app);
// Firebase storage reference
const storage = getStorage(app);

export { app, auth, db, storage };
