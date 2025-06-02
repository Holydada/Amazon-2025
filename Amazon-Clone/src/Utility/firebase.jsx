//only to register our web
import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth'
import "firebase/compat/firestore"
import 'firebase/compat/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALu4LwBuvJe_WQHkM9P2505gvmu7Nj5vw",
  authDomain: "clone-77a77.firebaseapp.com",
  projectId: "clone-77a77",
  storageBucket: "clone-77a77.firebasestorage.app",
  messagingSenderId: "734355656066",
  appId: "1:734355656066:web:8860dc87c5cdd42f62939b",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=app.firestore()