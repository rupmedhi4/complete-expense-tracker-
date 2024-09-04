import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAuoYCMzqqZq6n4Fi09x028okm3SNBaDk4",
  authDomain: "expense-tracker-11d71.firebaseapp.com",
  projectId: "expense-tracker-11d71",
  storageBucket: "expense-tracker-11d71.appspot.com",
  messagingSenderId: "879676555191",
  appId: "1:879676555191:web:bd3f35b0f3bab6208cb232",
  measurementId: "G-HY8CTDYKWL"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

