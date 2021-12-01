import React, { useState } from "react";
import Button from "@mui/material/Button";
import Fields from "../components/Fields/Fields";
import { auth, loginEmailPass } from "../utils/firebase";

function Login() {
  const [user, setUser] = useState([
    {
      name: "username",
      displayName: "Username",
      type: "email",
      help: "Invalid username and/or mismatch.",
      value: "",
      error: false,
    },
    {
      name: "password",
      type: "password",
      displayName: "Password",
      help: "Invalid password.",
      value: "",
      error: false,
    },
  ]);

  const updateLogin = (key, value) => {
    setUser(
      user.map((item) => {
        if (item.name === key)
          return {
            ...item,
            value,
          };
        return item;
      })
    );
  };

  const submitLogin = () => {
    const credentials = Object.assign(
      {},
      ...user.map((field) => ({ [field.name]: field.value }))
    );
    console.log(credentials);
    if (1) {
      console.log("This shit don't work! Do not touch!");
      loginEmailPass(auth, credentials.username, credentials.password);
    } else {
      // default error to username
      setUser(
        user.map(
          (obj) =>
            user
              .filter((field) => field.name === "username")
              .map((field) => ({ ...field, error: true }))
              .find((field) => field.name === obj.name) || obj
        )
      );
    }
  };

  const refAccount = () => {
    window.location.href = "Account";
  };

  // const validateLogin = (username, password) => {
  //   //stuff from api goes here
  //   console.log(username, password); //for debugging
  //   if (username === password) {
  //     //temporary check
  //     setError(false);
  //     let page = new URLSearchParams(window.location.search).get("Page");
  //     fetch("http://localhost:8000/user/", { method: "GET" })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         let users = data["users"];
  //         let selectedUser = users.filter((user) => {
  //           return user.username === username;
  //         });
  //         console.log(selectedUser);
  //         window.location.href =
  //           page + "?User=" + username + "&UserID=" + selectedUser[0]._id;
  //       });
  //   } else setError(true);
  // };

  return (
    <div className="LoginPage">
      <center
        style={{ boxShadow: "0.1px 0.25px 3px black", padding: "2rem 0.5rem" }}
      >
        <h1>Login</h1>
        <Fields user={user} updateLogin={updateLogin} />
        <Button onClick={() => submitLogin()}>Login</Button>
        <Button variant="contained" onClick={() => refAccount()}>
          Create an Account{" "}
        </Button>
      </center>
    </div>
  );
}

export default Login;
