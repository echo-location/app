import React from 'react'
import BarDrawer from "./BarDrawer";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

var errorState = false
function validateLogin(username, password){
  //stuff from api goes here
  if(username === password) //temporary check
  {
      errorState = true
      window.location.href = "User" //redirect to user page
  }
  else
      return false
}

function FormPropsTextFields() {
  var help = ""
  if(errorState)
  {
    help = "Invalid password or username"
  }
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
          error = {errorState}
          autoComplete = "current-username"
        />
        <TextField
          required id="Password"
          label="Password"
          type="password"
          error = {errorState}
          autoComplete="current-password"
          helperText = {help}
        />
      </div>
    </Box>
  );
}


function UserInformation()
{
    return (
    <div className="UserInformationPage">
    <BarDrawer />
    <center>
    <h1>
        Please enter your login information or create an account.
    </h1>
    <FormPropsTextFields />
    <Button onClick= {() =>validateLogin(document.getElementById("Username"), document.getElementById("Username"))}>Login</Button>
    </center>
    </div>
    );
}


export default UserInformation;