import { Button } from "@mui/material";
import React from "react";
import AlertDialog from "../components/Dialog/AlertDialog";
function changePassword(newPassword,confirm){
    if(newPassword===confirm)
    {
        console.log(newPassword)
    }
    else
    {
        
    }
}
function backToItems(){
    const username = new URLSearchParams(window.location.search).get("User");
    const userid = new URLSearchParams(window.location.search).get("UserID");
    window.location.href = `User?User=${username}&UserID=${userid}`;
  }

function UserSettings(){
    return(
        <div className="user-settings">
            <Button onClick = {() => backToItems()}>Return to your items</Button>
            <AlertDialog type = "User" />
            <Button onClick = {() => changePassword()}>Change Password</Button>
        </div>);
}
export default UserSettings;