import { useState, useEffect } from "react";
import './App.css';
import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapIcon from '@mui/icons-material/Map';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function iconselect(index){
    switch(index)
    {
        case 0:
            return <CatchingPokemonIcon />
        case 1:
            return <MapIcon />
        case 2:
            return <PersonIcon />
        case 3:
            return <HelpIcon />
        default:
            return
    }
}

function BarandDrawer(){
    const [options, setOptions] = React.useState(false);
    function handleClick(on) {
        setOptions(on);
    }
    return(<div>
    <SearchAppBar onClick = {() =>setOptions(true)}></SearchAppBar>
    <SwipeableTemporaryDrawer options = {options} onClicks={handleClick}></SwipeableTemporaryDrawer></div>
    )
}

function SearchAppBar({onClick}) {
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
              onClick = {() => onClick()}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              textAlign = "left"
            >
              Echo Location
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    );
}

function SwipeableTemporaryDrawer({options, onClicks}) {
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={() => onClicks(false)}
      onKeyDown={() => onClicks(false)}
    >
      <List>
        {['Lost Items', 'Map', 'User Information', 'Help'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {iconselect(index)}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
        <React.Fragment>
            <SwipeableDrawer anchor="left" open={options} onClose={() => onClicks(false)} onOpen={() => onClicks(true)}>{list("left")}</SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}


const getPosts = async () => {
  const url = "https://echolocation-api.herokuapp.com/";
  const response = await fetch(`${url}user`, {
    method: "GET",
  });
  console.log(response);
  return response.json();
};

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts().then((posts2) => {
      //const copy = JSON.parse(JSON.stringify(posts2["users"]));
      setPosts(posts2["users"]);
      console.log(posts2["users"]);
    });
  }, []);

  return (
    <div className="App">
        <BarandDrawer />
      <div className="Items">
        <h1>Items</h1>
        {posts.map((user) => (
          <div>
            {user.username}
            <b>
              {user.items.map((item) => (
                <div>
                  <i>{item}</i> <br />
                </div>
              ))}
            </b>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;