import Button from "@mui/material/Button";
import React, {useState} from "react";
import AlertDialog from "../components/Dialog/AlertDialog";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {changePassword} from "../utils/firebase"

function backToItems(){
    const username = new URLSearchParams(window.location.search).get("User");
    const userid = new URLSearchParams(window.location.search).get("UserID");
    window.location.href = `User?User=${username}&UserID=${userid}`;
  }

function UserSettings(){
    const [error, setError] = useState(false);
    let help = ""
    function changePass(newPassword,confirm){
        if(newPassword===confirm)
        {
            setError(false);
            help = "";
            changePassword(newPassword);
        }
        else
        {
            setError(true);
            help = "Please make sure your passwords match.";
        }
    }
    return(
        <div className="user-settings">
            <Button onClick = {() => backToItems()}>Return to your items</Button>
            <center>
                <h1>Fill in the fields to change your password, or press the corresponding buttons to delete your account or go back to your items page</h1>
                <Box>
                    <TextField id="pass" label="Password" variant="standard" error = {error} helperText = {help}/>
                    <TextField id="confirm" label="Confirm Password" variant="standard" error = {error}/>
                </Box>
                <Button onClick = {() => changePass(document.getElementById("pass").value,document.getElementById("confirm").value)}>Change Password</Button>
                <AlertDialog type = "User" />
            </center>
        </div>);
}
export default UserSettings;