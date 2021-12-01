import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Fields.css";

const Fields = ({ user, updateLogin }) => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="fields">
        {user.map(({ name, displayName, type, help, error }) => (
          <TextField
            required
            key={name}
            type={type}
            id={name}
            label={displayName}
            error={error}
            helperText={error ? help : ""}
            onChange={(e) => updateLogin(name, e.target.value)}
          />
        ))}
      </div>
    </Box>
  );
};

export default Fields;
