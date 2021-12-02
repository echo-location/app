import React from "react";
import Button from "@mui/material/Button";
//import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import logowhite from "../logowhite.png";
import "../App.css";
function HomePage() {
  return (
    <div className="center-page">
      <center>
        <img
          className="logo"
          src={logowhite}
          width="100"
          length="200"
          alt="LogoWhite"
        />
        <h1>Echo Location</h1>
        <Button
          variant="contained"
          onClick={() => {
            window.location.href = "LostItems";
          }}
        >
          Enter
        </Button>
        <h3>A simple way to find your items</h3>
      </center>
    </div>
  );
}

//<EditLocationAltIcon sx={{ fontSize: 64}} />

export default HomePage;
