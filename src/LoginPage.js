import React from 'react'
import BarDrawer from "./BarDrawer";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

var errorState = false
function validateLogin(username, password){
  //stuff from api goes here
  console.log(username, password) //for debugging
  if(username === password) //temporary check
  {
      errorState = false
      let para = new URLSearchParams();
      para.append("User", username);
      window.location.href = "UserInformation?" + para.toString(); 
  }
  else
      errorState = true
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

function goToCreateAccount(){
  window.location.href = "CreateAccount"
}

function Login()
{
    return (
    <div className="LoginPage">
    <BarDrawer />
    <center>
    <h1>
        Please enter your login information or create an account.
    </h1>
    <FormPropsTextFields />
    <Button onClick= {() =>validateLogin(document.getElementById("Username").value, document.getElementById("Password").value)}>Login</Button>
    </center>
    <center>
      <Button variant = "contained" onClick = {() =>goToCreateAccount()}>Create an Account </Button>
    </center>
    </div>
    );
}


export default Login;