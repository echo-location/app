import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";

const AddItemForm = () => {
  const [item, setItem] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [moreInfo, setMoreInfo] = React.useState("");
  const updateItem = (evt) => setItem(evt.target.value);
  const updateLocation = (evt) => setLocation(evt.target.value);
  const updateMoreInfo = (evt) => setMoreInfo(evt.target.value);

  const [file, setFile] = useState(null);
  const [url, setURL] = useState(null);

  const submitFile = async (e) => {
    try {
      e.preventDefault();
      console.log(item);
      // Item and location are required
      if (item === "" || location === "") {
        // need to let user know about required fields
        throw new Error("Please input an item name");
      }

      const payload = {
        name: item,
        location: location,
        description: moreInfo,
      };
      console.log(item);
      console.log(location);
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("json", JSON.stringify(payload));
      console.log(formData.getAll("json"));
      await fetch(
        `http://localhost:8000/item/create?uid=61a58f38eb4d44a6585ab895`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setURL(data.data.Location);
        });
      // handle success
    } catch (error) {
      // handle error
      console.log(error);
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
          id="outlined-required"
          label="Item"
          placeholder="Ex: AirPods"
          onChange={updateItem}
        />
        <TextField
          required
          id=""
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
      <form onSubmit={(e) => submitFile(e)}>
        <AddPhotoAlternateIcon />
        <label>Upload file &nbsp;</label>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files);
          }}
        />
        <IconButton
          type="submit"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
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
