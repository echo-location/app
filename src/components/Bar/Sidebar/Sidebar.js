import {
  Box,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";

import { pageSelect, iconSelect } from "../../../utils/utils";
import "./Sidebar.css";
const Sidebar = ({ options, setOptions }) => {
  const pages = [
    "Lost Items",
    "Report An Item",
    "Map",
    "User Information",
    "Help",
  ];

  const list = () => (
    <Box
      sx={{ width: "25rem" }}
      onClick={() => setOptions(false)}
      onKeyDown={() => setOptions(false)}
    >
      <div className="image-container">
        <img className="image" src="bg.jpg" alt="Background" />
        <div class="centered">let's navigate!</div>
      </div>
      <List>
        {pages.map((text, index) => (
          <>
            <ListItemButton>
              <ListItem onClick={() => pageSelect(text)}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      background: "#344CB7",
                      width: 30,
                      height: 30,
                      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.15)",
                    }}
                    variant="rounded"
                  >
                    {iconSelect(index)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={text} />
              </ListItem>
            </ListItemButton>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      <>
        <SwipeableDrawer
          anchor="left"
          open={options}
          onClose={() => setOptions(false)}
          onOpen={() => setOptions(true)}
        >
          {list()}
        </SwipeableDrawer>
      </>
    </div>
  );
};

export default Sidebar;
