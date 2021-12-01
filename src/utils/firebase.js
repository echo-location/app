import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAFsqkQCx_7CYScQPSk21vYJ_j2vJYGz7Y",

  authDomain: "echo-location-618f9.firebaseapp.com",

  projectId: "echo-location-618f9",

  storageBucket: "echo-location-618f9.appspot.com",

  messagingSenderId: "1050387450921",

  appId: "1:1050387450921:web:2989826bc4be4e0d84e038",
};

const app = firebase.initializeApp(config);
const auth = app.auth();

const loginEmailPass = async (email, pass) => {
  try {
    await auth.signInWithEmailAndPassword(email, pass);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerEmailPass = async (name, email, pass) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, pass);
    const user = res.user;
  } catch (err) {
    console.error(err);
    console.error(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    console.error(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  loginEmailPass,
  registerEmailPass,
  sendPasswordReset,
  logout,
};
