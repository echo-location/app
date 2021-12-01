import React, { useState } from "react";
import { Box, IconButton, Input, TextField } from "@mui/material";
import { AddPhotoAlternate as AddPhotoAlternateIcon, Send as SendIcon } from "@mui/icons-material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/lab";

const AddItemForm = () => {
  const [item, setItem] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [moreInfo, setMoreInfo] = React.useState("");
  const updateItem = (evt) => setItem(evt.target.value);
  const updateLocation = (evt) => setLocation(evt.target.value);
  const updateMoreInfo = (evt) => setMoreInfo(evt.target.value);

  const [file, setFile] = useState(null);
  const [url, setURL] = useState(null);
  const [date, setDate] = useState(new Date());
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
        date: date || new Date(),
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
          label="More Info (Optional)"
          type="Item"
          placeholder="Ex: Found it near the front"
          multiline
          maxRows="20"
          onChange={updateMoreInfo}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            minDate={new Date(0)}
            maxDate={new Date().setDate(new Date().getDate() + 2)}
            label="Date Found (Optional)"
            value={date}
            onChange={(newValue) => {
              /*
              if (newValue === '' || newValue === null) {
                setDate(new Date());
                console.log('empty date')
                return;
              } else if (!newValue) {
                console.log(`falsy ${newValue}`);
              }*/
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} helperText="Defaults to Today if Left Blank" inputProps={{ ...params.inputProps, placeholder: "MM/DD/YYYY" }} />}
          />
        </LocalizationProvider>
      </Box>
      <br />
      <br />
      <form onSubmit={(e) => submitFile(e)}>
        <AddPhotoAlternateIcon style={{
          paddingRight: "1%",
          verticalAlign: "sub"
        }} />
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
