import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MapIcon from "@mui/icons-material/Map";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import HelpIcon from "@mui/icons-material/Help";
import PersonIcon from "@mui/icons-material/Person";

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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.common.white,
  padding: theme.spacing(0, 2),
  height: "100%",
  pointerEvents: "none",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
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

function pageSelect(page) {
  switch (page) {
    case "Lost Items":
      window.location.href = "/LostItemsPage";
      break;
    case "Map":
      window.location.href = "/Map";
      break;
    case "User Information":
      window.location.href = "/UserInformation";
      break;
    case "Help":
      window.location.href = "/Help";
      break;
    default:
      return;
  }
}

function iconSelect(index) {
  switch (index) {
    case 0:
      return <CatchingPokemonIcon />;
    case 1:
      return <MapIcon />;
    case 2:
      return <PersonIcon />;
    case 3:
      return <HelpIcon />;
    default:
      return;
  }
}

const getItems = async (query) => {
  //waiting for backend to implement items search
  const url = "https://echolocation-api.herokuapp.com/";
  const response = await fetch(`${url}user`, {
    method: "GET",
    // body: JSON.stringify({ query }),
  });
  console.log(response);
  return response.json();
};

function SearchAppBar({ onClick }) {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  const search = async () => {
    const results = await getItems(query);
    console.log(`Search query: ${query}`);
    setItems(results);
    console.log(items); // THIS IS ONLY HERE SO REPO DOESN'T FAIL NETLIFY TEST FOR UNUSED VARIABLES (items)
  };

  const updateQuery = (newQuery) => {
    setQuery(newQuery.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => onClick()}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            textAlign="left"
          >
            Echo Location
          </Typography>
          <Search>
            <IconButton onClick={search}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
            </IconButton>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={updateQuery}
              //onChange={updateQuery} // maybe if we want instant search results
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  console.log("ENTER KEY PRESSED");
                  //call query function here
                  search();
                }
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function SwipeableTemporaryDrawer({ options, onClicks }) {
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={() => onClicks(false)}
      onKeyDown={() => onClicks(false)}
    >
      <List>
        {["Lost Items", "Map", "User Information", "Help"].map(
          (text, index) => (
            <ListItem button key={text} onClick={() => pageSelect(text)}>
              <ListItemIcon>{iconSelect(index)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor="left"
          open={options}
          onClose={() => onClicks(false)}
          onOpen={() => onClicks(true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}

function BarDrawer() {
  const [options, setOptions] = React.useState(false);
  function handleClick(on) {
    setOptions(on);
  }
  return (
    <div>
      <SearchAppBar onClick={() => setOptions(true)}></SearchAppBar>
      <SwipeableTemporaryDrawer
        options={options}
        onClicks={handleClick}
      ></SwipeableTemporaryDrawer>
    </div>
  );
}

export default BarDrawer;
