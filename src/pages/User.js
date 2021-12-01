import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getItems } from "../utils/utils";
import ItemCard from "../components/ItemCard/ItemCard";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AlertDialog({type, throwaway, setThrowaway, id}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteUser(){
    const userID = new URLSearchParams(window.location.search).get("UserID");
    fetch(`http://localhost:8000/user/${userID}`,{method:'DELETE'}).then((response)=>{
      if(response.ok){
        console.log(response)
        handleClose()
        window.alert("You have successfully deleted your account. Redirecting back to lost items page.")
        setTimeout(()=> window.location.href = "LostItems", 2000)
      } else{throw new Error("Please try again.")}
    })
  }
  const remove = (id) => {
    console.log("remove", id);
    fetch(`http://localhost:8000/item/${id}`, {
    method: "DELETE",
    }).then((response) => {
      if(response.ok)
      {
        console.log(response);
        setThrowaway(!throwaway)
      }
      else
      {
        throw new Error("please try again")
      }
    });
    handleClose()
  };

  if(type === "User")
  {
    return (
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Delete Account
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete your account? "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This is permanent!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={() => {deleteUser()}} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  else
  {
    return (
      <div>
        <Button style={{ width: "200px", background: "red" }} onClick={handleClickOpen}>
          Delete Item
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this item?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This is permanent!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={() => remove(id)} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function UserInformation() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState({});
  const [throwaway, setThrowaway] = useState(false);

  const findUser = async (id) => {
    try {
      return fetch(`http://localhost:8000/user/${id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const userQuery = new URLSearchParams(window.location.search).get("User");
      const getUser = async (item, query) => {
        const user = await findUser(item.user);
        if(user.user[0]=== undefined)
        {
          return false;
        }
        return user.user[0].username === query;
      };

      const fetchByUser = async () => {
        const response = await getItems();
        const results = await Promise.all(
          response["items"].map((item) => getUser(item, userQuery))
        );
        return response["items"].filter((_v, index) => results[index]);
      };

      const newItems = await fetchByUser();
      let dict = {};
      for (let i = 0; i < newItems.length; i++) {
        const user = await findUser(newItems[0].user);
        dict[newItems[i]._id] = user.user[0];
      }

      setItems(newItems);
      setUsers(dict);
    };
    fetchItems();
  }, [throwaway]);

  return (
    <div className="UserInformationPage">
      <div style={{ display: "flex", justifyContent: 'flex-end'}}>
        <AlertDialog type = "User"></AlertDialog>
      </div>
      <h1>Items You have Reported</h1>
      {items.map(({ _id, name, location, description, date, photo }) => (
        <center>
          <div>
            <ItemCard
              username={users[_id] === undefined ? " " : users[_id].username}
              item={name}
              location={location}
              contactInfo={
                users[_id] === undefined
                  ? ""
                  : `${users[_id].email} | ${users[_id].phone} `
              }
              description={description}
              dateFound={`Found: ${new Date(date).toLocaleDateString([], {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}`}
              image={photo}
              userId={users[_id] === undefined ? "" : users[_id].username}
              itemId={_id}
            />
            <AlertDialog type = "item" throwaway = {throwaway} setThrowaway = {() => setThrowaway()} id = {_id}>Delete Item</AlertDialog>
          </div>
        </center>
      ))}
    </div>
  );
}

export default UserInformation;
