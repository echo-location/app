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
  const pages = ["Lost Items", "Map", "User Information", "Help"];

  const list = () => (
    <Box
      sx={{ width: 250 }}
      onClick={() => setOptions(false)}
      onKeyDown={() => setOptions(false)}
    >
      <List>
        {pages.map((text, index) => (
          <ListItem button key={text} onClick={() => pageSelect(text)}>
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
