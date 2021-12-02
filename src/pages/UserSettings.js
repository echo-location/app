import Button from "@mui/material/Button";
import React, { useState } from "react";
import AlertDialog from "../components/Dialog/AlertDialog";
import Fields from "../components/Fields/Fields";
import { validateForm } from "../utils/utils";

function backToItems() {
  const username = new URLSearchParams(window.location.search).get("User");
  const userid = new URLSearchParams(window.location.search).get("UserID");
  window.location.href = `User?User=${username}&UserID=${userid}`;
}

function UserSettings() {
  const [user, setUser] = useState([
    {
      name: "password",
      type: "password",
      displayName: "Password",
      help: "Invalid password.",
      value: "",
      error: false,
    },
    {
      name: "confirm",
      type: "password",
      displayName: "Confirm Password",
      help: "Invalid password/mismatch.",
      value: "",
      error: false,
    },
  ]);

  const updateForm = (key, value) => {
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

  function changePass() {
    console.log(user);
    const credentials = Object.assign(
      {},
      ...user.map((field) => ({ [field.name]: field.value }))
    );
    console.log(credentials);
    const errors = validateForm(credentials);
    console.log(errors);
    console.log(errors.length);

    if (errors.length === 0) {
      console.log("This shit don't work! Do not touch!");
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
  }
  return (
    <div className="user-settings">
      <Button variant="outlined" onClick={() => backToItems()}>
        Return to your items
      </Button>
      <center>
        <h1>Change pass, delete account, or return.</h1>
        <Fields user={user} updateLogin={updateForm} />
        <Button onClick={() => changePass()}>Change Password</Button>
        <AlertDialog type="User" />
      </center>
    </div>
  );
}
export default UserSettings;
