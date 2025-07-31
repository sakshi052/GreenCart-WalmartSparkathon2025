import { initializeApp, getApps, getApp } from "firebase/app"; // ✅ include getApps and getApp
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAkkzYGmSdsqAXWQp5sReCrgxf_MLG4uu4",
  authDomain: "greencart-2c145.firebaseapp.com",
  projectId: "greencart-2c145",
  storageBucket: "greencart-2c145.firebasestorage.app",
  messagingSenderId: "440302606412",
  appId: "1:440302606412:web:892313fdbd00eb8b78fce9"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);