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
import AlertDialog from "../components/Dialog/AlertDialog";
import Button from '@mui/material/Button';

import { isLoggedIn } from "../utils/firebase";

function goToSettings() {
  const username = new URLSearchParams(window.location.search).get("User");
  const userid = new URLSearchParams(window.location.search).get("UserID");
  window.location.href = `UserSettings?User=${username}&UserID=${userid}`;
}
function UserInformation() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState({});
  const [throwaway, setThrowaway] = useState(false);
  // const [timeout] = useState(setTimeout(() => { window.location.href = "http://localhost:3000/Login" }, 1000));

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
        if (user.user[0] === undefined) {
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
  if (isLoggedIn() === false) {
    window.location.href = 'http://localhost:3000/Login';
  }

  return (
    <div className="UserInformationPage">
      <div style={{ display: "flex", justifyContent: 'flex-end' }}>
        <AlertDialog type="Logout" />
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
            <AlertDialog type="item" throwaway={throwaway} setThrowaway={setThrowaway} id={_id}>Delete Item</AlertDialog>
          </div>
        </center>
      ))}
      <center>
        <div style={{ position: "relative", width: "200px", height: '400px', }}>
          <div style={{ position: "absolute", left: "15px", bottom: "5px" }}>
            <Button variant="contained" onClick={() => goToSettings()}>Settings</Button>
          </div>
        </div>
      </center>
    </div>
  );
}

export default UserInformation;
