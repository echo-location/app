import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Dropdown.css";
const Dropdown = ({ onClick }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        }}
        position="static"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{
              mr: 2,
              borderRadius: "20px",
              width: "36px",
              height: "36px",
            }}
            onClick={() => onClick()}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className="echo">echo</p>
            <p className="location">Location</p>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Dropdown;
