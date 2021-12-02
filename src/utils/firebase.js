import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import { createHash } from "crypto";

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

const loginEmailPass = async (email, hash) => {
  try {
    console.log(typeof (email), typeof (hash), email, hash);
    const signIn = await signInWithEmailAndPassword(auth, email, hash);
    console.log(signIn);
    window.location.href = "http://localhost:3000/User";
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerEmailPass = async (email, pass, username, phone) => {
  try {
    const hashFunc = createHash("sha512");
    const hash = hashFunc.update(pass);
    const hashString = hash.digest("hex");
    let res = await createUserWithEmailAndPassword(auth, email, hashString);
    const user = res.user;
    console.log(`${Object.keys(user)}`);

    // console.log(hash);
    // console.log(typeof (hashString), hashString);
    // console.log(typeof (hash.digest("hex")), typeof (user));
    res = await fetch("http://localhost:8000/auth/register", {
      method: "POST", headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({ username: username, email: email, phone: phone })
    });
    if (res.ok) {
      setTimeout(() => {
        window.location.href = "http://localhost:3000/login";
      }, 2000);
    }

  } catch (err) {
    console.error(err);
    console.error(Object.keys(err));
    // console.error(Object.keys(err));
    console.error(err.name);
    console.error(typeof (err.message));
    console.error((err.message));
    switch (err.message) {
      case "Firebase: Error (auth/email-already-in-use).":
        alert("Email already in use.")
        break;
      default:
        alert("Error Registering");
        break;
    }
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

const isLoggedIn = () => {
  return (getAuth().currentUser ? true : false);
};

export { app, auth, loginEmailPass, registerEmailPass, sendPasswordReset, logout, isLoggedIn };