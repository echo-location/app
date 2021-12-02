import React, { useState } from "react";
import Button from "@mui/material/Button";
import Fields from "../components/Fields/Fields";
import { registerEmailPass } from "../utils/firebase";
import { validateForm } from "../utils/utils";
import { isLoggedIn } from "../utils/firebase";

const CreateAccount = () => {
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
      help: "Invalid password (must be at least be 6 characters).",
      value: "",
      error: false,
    },
    {
      name: "confirm",
      type: "password",
      displayName: "Confirm Password",
      help: "Invalid mismatch with password.",
      value: "",
      error: false,
    },
    {
      name: "email",
      type: "email",
      displayName: "Email",
      help: "Invalid email, use the format firstlast@service.com.",
      value: "",
      error: false,
    },
    {
      name: "phone",
      type: "text",
      displayName: "Phone Number",
      help: "Please put your phone number in the form 'XXX-XXX-XXXX'.",
      value: "",
      error: false,
    },
  ]);
  const updateRegister = (key, value) => {
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
  const submitRegister = () => {
    const credentials = Object.assign(
      {},
      ...user.map((field) => ({ [field.name]: field.value }))
    );
    const errors = validateForm(credentials);
    console.log(errors);
    console.log(errors.length);
    if (errors.length === 0) {
      console.log("This shit don't work! Do not touch!");
      registerEmailPass(
        credentials.email,
        credentials.password,
        credentials.username,
        credentials.phone
      );
    } else {
      setUser(
        user.map(
          (obj) =>
            user
              .filter((field) => field.name in Object.assign({}, ...errors))
              .map((field) => ({ ...field, error: true }))
              .find((field) => field.name === obj.name) || obj
        )
      );
    }
  };
  if (isLoggedIn() === true) {
    window.location.href = "http://localhost:3000/User";
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <center
        style={{
          width: "20%",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.15)",
          padding: "3rem 2rem",
        }}
      >
        <h1 style={{ margin: 0 }}>Register</h1>
        <p style={{ margin: "0 0 1.5rem 0" }}>Gain access to our features!</p>
        <Fields user={user} updateLogin={updateRegister} />
        <Button
          sx={{ margin: "2rem" }}
          variant="contained"
          onClick={() => submitRegister()}
        >
          Create an Account{" "}
        </Button>
      </center>
    </div>
  );
};

export default CreateAccount;
