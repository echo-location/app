import {
  Box,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { pageSelect, iconSelect } from "../../../utils/utils";

const Sidebar = ({ options, setOptions }) => {
  const pages = ["Lost Items", "Report An Item", "Map", "User Information", "Help"];

  const list = () => (
    <Box
      sx={{ width: "20rem", padding: "2rem 1rem" }}
      onClick={() => setOptions(false)}
      onKeyDown={() => setOptions(false)}
    >
      <List>
        {pages.map((text, index) => (
          <ListItem
            sx={{ padding: "2rem 0 2rem 3rem" }}
            button
            key={text}
            onClick={() => pageSelect(text)}
          >
            <ListItemIcon>{iconSelect(index)}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
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
