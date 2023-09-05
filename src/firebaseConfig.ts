import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

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
// collection reference
const collRef = collection(db, "posts");

// Get collection data
getDocs(collRef)
  .then((snapshot) => {
    let posts: any = [];
    snapshot.docs.forEach((doc) => {
      console.log(doc);
      posts.push({ ...doc.data(), id: doc.id });
    });
    console.log(posts);
  })
  .catch((error) => {
    console.log(error);
  });

export { app, auth, db };
