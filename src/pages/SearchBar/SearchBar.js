import React, { useState } from "react";

import { styled, alpha } from "@mui/material/styles";
import { IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { getItems } from "../../utils/utils";

const SearchBar = ({ setItems }) => {
  const [query, setQuery] = useState("");
  const search = async () => {
    let url = query;
    if (query === "") url = "";
    const results = await getItems(url);
    setItems(results.items);
  };

  return (
    <Search>
      <IconButton color="secondary" onClick={search}>
        <SearchIcon style={{ width: "24px", height: "24px", color: "gray" }} />
      </IconButton>
      <StyledInputBase
        placeholder="Search…"
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(ev) => (ev.key === "Enter" ? search() : "")}
      />
    </Search>
  );
};

// styling
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    background: "primary",
    border: "1px solid #CCC",
    boxShadow: "0.25px 0.5px 2px #BBB",
    borderRadius: "20px",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
export default SearchBar;
