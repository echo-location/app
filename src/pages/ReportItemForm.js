import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import { Input } from "@mui/material";

const AddItemForm = () => {
  const [item, setItem] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [moreInfo, setMoreInfo] = React.useState("");
  const updateItem = (evt) => setItem(evt.target.value);
  const updateLocation = (evt) => setLocation(evt.target.value);
  const updateMoreInfo = (evt) => setMoreInfo(evt.target.value);

  const [file, setFile] = useState(null);
  const [url, setURL] = useState(null);
  //let uploadFailure = false;

  const submitFile = async (e) => {
    try {
      e.preventDefault();
      console.log(item);
      // Item and location are required
      if (item === "") {
        // need to let user know about required fields
        window.alert("Please input an item name.");
        throw new Error("Please input an item name");
      } else if (location === "") {
        // need to let user know about required fields
        window.alert("Please input a location.");
        throw new Error("Please input an location");
      }

      const payload = {
        name: item,
        location: location,
        description: moreInfo,
      };
      const formData = new FormData();
      if (file) {
        formData.append("file", file[0]);
      }
      formData.append("json", JSON.stringify(payload));
      console.log(formData.getAll("json")); //for testing purposes to see if request was successful
      let id = new URLSearchParams(window.location.search).get("UserID");
      await fetch(
        `http://localhost:8000/item/create?uid=${id}`, //need to get UID of user
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Couldn't add item");
          }
          return response.json();
        })
        .then((data) => {
          console.log("DATA");
          console.log(data);
          if (file) {
            setURL(data.data.Location);
          }
        });
      // handle success
      window.alert("Item created Successfully");
      setTimeout(() => {window.location.href = "LostItems"}, 1000)
    } catch (error) {
      // handle error
      console.log(error);
      //<Alert severity="error">This is an error alert — check it out!</Alert>
    }
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="itemName"
          label="Item Name"
          placeholder="Ex: AirPods"
          onChange={updateItem}
          autoFocus
        />
        <TextField
          required
          id="location"
          label="Location"
          type="Item"
          placeholder="Ex: Powell Library"
          onChange={updateLocation}
        />
        <TextField
          id="moreInfo"
          label="More Info"
          type="Item"
          placeholder="Ex: Found it near the front"
          multiline
          onChange={updateMoreInfo}
        />
      </Box>
      <br />
      <br />
      <form onSubmit={(e) => submitFile(e)}>
        <AddPhotoAlternateIcon />
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            disableUnderline
            onChange={(e) => {
              setFile(e.target.files);
            }}
          />
        </label>
        <IconButton
          type="submit"
          edge="start"
          color="secondary"
          aria-label="open drawer"
          sx={{ mr: 2, border: 2, borderRadius: 120 }}
        >
          Add Item &nbsp;
          <SendIcon />
        </IconButton>
      </form>
      {url && <img src={url} alt="favicon.ico" />}
    </div>
  );
};

export default AddItemForm;
