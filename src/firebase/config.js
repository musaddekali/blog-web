import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyB-4wc-4Yvanije9v6D7t3pM4C2xqY47Q0",
//   authDomain: "blog-web-mahid.firebaseapp.com",
//   projectId: "blog-web-mahid",
//   storageBucket: "blog-web-mahid.appspot.com",
//   messagingSenderId: "809329850679",
//   appId: "1:809329850679:web:e540fa6f2d04ba561202b2"
// };

// firebase api key
// REACT_APP_API_KEY = AIzaSyB-4wc-4Yvanije9v6D7t3pM4C2xqY47Q0
// REACT_APP_AUTH_DOMAIN = blog-web-mahid.firebaseapp.com
// REACT_APP_PROJECT_ID = blog-web-mahid
// REACT_APP_STORAGE_BUCKET = blog-web-mahid.appspot.com
// REACT_APP_MESSAGING_SENDER_ID = 809329850679
// REACT_APP_APP_ID = 1:809329850679:web:e540fa6f2d04ba561202b2


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { storage, db, auth };