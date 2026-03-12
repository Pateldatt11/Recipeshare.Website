// src/firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBnDPx51uIClWnH6f9uChefO8e75fE1ADI",
  authDomain: "recipe-web-eb241.firebaseapp.com",
  projectId: "recipe-web-eb241",
  storageBucket: "recipe-web-eb241.firebasestorage.app",
  messagingSenderId: "15002759659",
  appId: "1:15002759659:web:db90183c541aa36a3a29ae",
  measurementId: "G-KGK805HFE4",
  databaseURL: "https://recipe-web-eb241-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Analytics (optional - safe to initialize)
getAnalytics(app);   // no need to store if you're not using it immediately

// Named export for app (recommended)
export { app };

// Keep default export for backward compatibility if needed
export default app;