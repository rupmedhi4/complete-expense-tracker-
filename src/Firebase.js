import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBx8Q9RGRZ4lnxLOYhmYaXKUph_SpwfVTU",
  authDomain: "project1-expense-tracker.firebaseapp.com",
  projectId: "project1-expense-tracker",
  storageBucket: "project1-expense-tracker.appspot.com",
  messagingSenderId: "985997134577",
  appId: "1:985997134577:web:450fb01d2a713a05607750",
  measurementId: "G-DETZ6WB8JN"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

