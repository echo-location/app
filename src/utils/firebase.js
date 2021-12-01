import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const config = {
  apiKey: "AIzaSyAFsqkQCx_7CYScQPSk21vYJ_j2vJYGz7Y",

  authDomain: "echo-location-618f9.firebaseapp.com",

  projectId: "echo-location-618f9",

  storageBucket: "echo-location-618f9.appspot.com",

  messagingSenderId: "1050387450921",

  appId: "1:1050387450921:web:2989826bc4be4e0d84e038",
};

const app = initializeApp(config);
const auth = getAuth();

const loginEmailPass = async (email, pass) => {
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerEmailPass = async (name, email, pass) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    const user = res.user;
    console.log(user);
  } catch (err) {
    console.error(err);
    console.error(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    console.error(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { app, auth, loginEmailPass, registerEmailPass, sendPasswordReset, logout };