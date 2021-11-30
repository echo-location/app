import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function FormPropsTextFields({ errorState}) {
  let help = "";
  if (errorState) {
    help = "Invalid password or username";
  }
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="Username"
          label="Username"
          error={errorState}
          autoComplete="current-username"
          helperText={help}
        />
        <TextField
          required
          id="Password"
          label="Password"
          type="password"
          error={errorState}
          autoComplete="current-password"
        />
      </div>
    </Box>
  );
}

function goToCreateAccount() {
  window.location.href = "Account";
}

function Login() {
  const [errorState, setErrorState] = useState(false);
  function validateLogin(username, password) {
    //stuff from api goes here
    console.log(username, password); //for debugging
    if (username === password) {
      //temporary check
      setErrorState(false);
      let page = new URLSearchParams(window.location.search).get("Page");
      fetch("http://localhost:8000/user/", {method:'GET'}).then((response) => response.json()).then((data) =>{
        let users = data["users"]
        let selectedUser = users.filter(user => {return user.username === username})
        console.log(selectedUser)
        window.location.href = page + "?User=" + username +"&UserID="+ selectedUser[0]._id
      });
    } else setErrorState(true);
  }
  return (
    <div className="LoginPage">
      <center>
        <h1>Please enter your login information or create an account.</h1>
        <FormPropsTextFields
          errorState={errorState}
          setErrorState={() => setErrorState}
        />
        <Button
          onClick={() =>
            validateLogin(
              document.getElementById("Username").value,
              document.getElementById("Password").value
            )
          }
        >
          Login
        </Button>
      </center>
      <center>
        <Button variant="contained" onClick={() => goToCreateAccount()}>
          Create an Account{" "}
        </Button>
      </center>
    </div>
  );
}

export default Login;
