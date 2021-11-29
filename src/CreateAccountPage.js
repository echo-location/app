import React, {useState} from 'react'
import BarDrawer from "./BarDrawer";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function FormPropsTextFields({error}) {
  let errorState = false;
  if(error.length != 0)
  {
    errorState = true;
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
          autoComplete = "current-username"
          error = {errorState}
        />
        <TextField
          required id="Password"
          label="Password"
          type="password"
          autoComplete="current-password"
          error = {errorState}
        />
        <TextField
          required id="Confirm-Password"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          error = {errorState}
        />
      </div>
    </Box>
  );
}


function CreateAccount()
{
  const [error,setError] = useState("");
  async function createNewAccount(username, password, confirmPassword){
    //stuff from api goes here
    console.log(username, password, confirmPassword) //for debugging
    if(confirmPassword === password) //make sure that the password is confirmed
    {
      const url = "http://localhost:8000/user/";
      try {
        const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username.toString()})
      });
        console.log(response)
        if (response.ok){
          return
      }
        else
        {
          const error = await response.json();
          console.log(error)
          setError(error.message)
        } 
      } catch(err){
        console.log(err);
        setError(err);
      }
    }
    else
    {
      setError("Please make sure your passwords match")
      return
    }
  }
    return (
    <div className="LoginPage">
    <BarDrawer />
    <center>
    <h1>
        Please enter your information the requisite fields to create your account.
    </h1>
    <FormPropsTextFields error = {error}/>
    <div>{error}</div>
    <Button onClick= {() =>createNewAccount(document.getElementById("Username").value, document.getElementById("Password").value, document.getElementById("Confirm-Password").value)}>Create Account</Button>
    </center>
    </div>
    );
}


export default CreateAccount;