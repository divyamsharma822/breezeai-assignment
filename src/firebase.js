import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD30h2fuu30OF42YVGL4nkkAxVyPOOdKaE",
    authDomain: "breezeai-b8e53.firebaseapp.com",
    projectId: "breezeai-b8e53",
    storageBucket: "breezeai-b8e53.appspot.com",
    messagingSenderId: "788134687903",
    appId: "1:788134687903:web:24ce283e6579eb3288deaa",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };