import React, { useState } from "react";
import "./ItemCard.css";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Collapse,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ItemCard = ({
  username,
  item,
  location,
  contactInfo,
  image,
  description,
  dateFound,
  userId,
  itemId,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState("primary");
  const [showPhoto, setShowPhoto] = useState(false);

  function addToFavorites() {
    if (favorite === "primary") {
      setFavorite("secondary");
    } else {
      setFavorite("primary");
    }
    //fetch(`localhost:8000/item/${userId}${itemId}`, {method:'POST'}).then(response => {console.log(response)}) TODO: fetch in api
    console.log(userId, itemId);
  }
  return (
    <Card sx={{ maxWidth: 345, display: "flex" }}>
      <div className="modal" style={{ display: showPhoto ? "" : "none" }}>
        <div className="modal-content">
          <span className="close" onClick={() => setShowPhoto(false)}>
            &times;
          </span>

          <div className="modal-image">
            <img className="resize" src="mp100.jpg" alt="Mobbu!" />
          </div>

          <div className="modal-footer">
            <p>Add some photo metadata...</p>
          </div>
        </div>
      </div>
      <StyledCardMedia
        onClick={() => setShowPhoto(true)}
        component="img"
        sx={{ width: 40 }}
        image="mp100.jpg"
        alt="Mobbu!"
      />
      <div
        style={{
          flexDirection: "column",
          width: "100%",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "#344CB7", height: "5rem", width: "5rem" }}
              src={image}
            >
              {item.charAt(0)}
            </Avatar>
          }
          title={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Subtext>{username}</Subtext>
              <Text>{item}</Text>
            </div>
          }
          subheader={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                padding: "0.5rem 0",
              }}
            >
              <LocationOnIcon
                sx={{ padding: "0 0.5rem 0 0" }}
                fontSize="medium"
              />
              <Subtext>{location}</Subtext>
            </div>
          }
        />
        <Divider />
        <CardActions disableSpacing>
          <IconButton color={favorite} onClick={() => addToFavorites()}>
            <FavoriteIcon />
          </IconButton>

          <ExpandMore expand={expanded} onClick={() => setExpanded(!expanded)}>
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent
            sx={{
              paddingTop: "0",
            }}
          >
            <Text>{description}</Text>
            <Subtext>{dateFound}</Subtext>
            <Subtext>Contact: {contactInfo}</Subtext>
          </CardContent>
        </Collapse>
      </div>
    </Card>
  );
};

// styling
const StyledCardMedia = styled(CardMedia)(() => ({
  transition: "0.2s ease-out",
  "&:hover": {
    width: "100px",
    transition: "0.2s ease",
  },
}));

const Text = styled("p")(() => ({
  fontSize: "1.5rem",
  padding: 0,
  margin: 0,
}));

const Subtext = styled("p")(() => ({
  fontSize: "1.25rem",
  color: "grey",
  padding: 0,
  margin: 0,
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default ItemCard;