import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDeTWqbk-Zm8G24nXJXjZ7bLrVBif4qDuw",
  authDomain: "reactapp-4e0b2.firebaseapp.com",
  projectId: "reactapp-4e0b2",
  storageBucket: "reactapp-4e0b2.appspot.com",
  messagingSenderId: "211635754254",
  appId: "1:211635754254:web:f8312cf6baacbb1bf3735f",
  measurementId: "G-F70444F6PH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)
export const storage = getStorage(app)