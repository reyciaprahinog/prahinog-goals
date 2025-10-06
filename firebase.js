import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDMr_jQxACt7ry0fO2_l6kQUmqIA23Vzg",
  authDomain: "prahinog-goals.firebaseapp.com",
  projectId: "prahinog-goals",
  storageBucket: "prahinog-goals.firebasestorage.app",
  messagingSenderId: "1006162230035",
  appId: "1:1006162230035:web:d63b3d18584fe380f1f8e6"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore (app)
export const auth = getAuth(app);