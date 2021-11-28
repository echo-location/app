import React from 'react'
import BarDrawer from "./BarDrawer";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

var errorPassword = false
var errorUser = false
var helpPass = null
var helpUser = null
function createNewAccount(username, password, confirmPassword){
  //stuff from api goes here
  console.log(username, password, confirmPassword) //for debugging
  if(confirmPassword === password) //make sure that the password is confirmed
  {
      errorPassword = false
      const url = "https://echolocation-api.herokuapp.com/";
      const response = fetch(`${url}users/${username}`, {
          method: "POST",
      });
      console.log(response)
      if (response["message"] === "Username already taken.")
      {
          errorUser = true
          helpUser = "Username already taken."
      }
  }
  else
      errorPassword = true
      helpPass = "Please make sure your passwords match."
}

function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="Username"
          label="Username"
          error = {errorUser}
          autoComplete = "current-username"
          // Only allow showing error message, after determining that user has clicked the button
          onGetErrorMessage={errorUser ? helpUser : undefined}
          helperText = {helpUser}
        />
        <TextField
          required id="Password"
          label="Password"
          type="password"
          error = {errorPassword}
          autoComplete="current-password"
          onGetErrorMessage={errorPassword ? helpPass : undefined}
          helperText = {helpPass}
        />
        <TextField
          required id="Confirm-Password"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          onGetErrorMessage={errorPassword ? helpPass : undefined}
          helperText = {helpPass}
        />
      </div>
    </Box>
  );
}


function createAccount()
{
    return (
    <div className="LoginPage">
    <BarDrawer />
    <center>
    <h1>
        Please enter your information the requisite fields to create your account.
    </h1>
    <FormPropsTextFields />
    <Button onClick= {() =>createNewAccount(document.getElementById("Username").value, document.getElementById("Password").value, document.getElementById("Confirm-Password").value)}>Create Account</Button>
    </center>
    </div>
    );
}


export default createAccount;