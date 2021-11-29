import React, { useState, useEffect } from "react";
import "./App.css";
import BarDrawer from "./BarDrawer";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CardMediaImageWrapper = styled("div")(() => ({
  maxHeight: "50%",
  maxWidth: "50%",
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

function ItemCard(props) {
  const { username, item, location, contactInfo, image, moreInfo } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={image}>
            {" "}
            {/* MAKE ICON A SMALL IMAGE OF THE PICTURE IF IT EXISTS, OTHERWISE FIRST LETTER OF ITEM OR USER*/}
            {item.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${username} - ${item}`}
        subheader={`Found at ${location} | \n Contact: ${contactInfo}`}
      />
      {/* <CardMedia component="img" image="favicon.ico" height = "50" width = "50" alt={item} /> */}
      {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent> */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="More Info"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CardMediaImageWrapper>
            <CardMedia component="img" image={image} alt={item} />
          </CardMediaImageWrapper>
          <Typography paragraph>More Info: </Typography>
          <Typography paragraph>{moreInfo}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const getItems = async () => {
  const url = "http://localhost:8000/item/";
  const response = await fetch(`${url}`, {
    method: "GET",
  });
  //console.log(response);
  return response.json();
};
// takes an id and fetches the associated user.
async function findUser(id) {
  //console.log(id)
  const url = "http://localhost:8000/user/";
  try {const response = await fetch(`${url}${id}`, {
    method: "GET",
  });
    if (response.ok){
        const data = await response.json();
    return data.user[0];
    } 
    } catch(err){
      console.log(err)
    // display and say if request failed or user doesnt exist etc
    }
}

function LostItemsPage() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState({});
  useEffect(() => {
    async function fetchStuff() {
      const response = await getItems();
      const newItems = response["items"];
      setItems(response["items"]);
      var dict = {};
      for (let i = 0; i < newItems.length; i++) {
        const data = await findUser(newItems[i].user);
        dict[newItems[i]._id] = data;
      }
      setUsers(dict);
    }
    fetchStuff();
  }, []);

  return (
    <div className="LostItemsPage">
      <BarDrawer />
      <div className="Items">
        <h1>Lost Items</h1>
            {items.map((item) => (
              <center>
                <div>
                  <br />
                  <ItemCard
                    username = {users[item._id] == undefined ? ' ' : users[item._id].username}
                    item={item.name}
                    location={item.location}
                    contactInfo="example@ucla.edu | 123-456-7890" //user.contactinfo? needs backend to handle
                    moreInfo= {`${item.description} \r\n Found: ${item.date.substring(0,10)}`}  
                    image="favicon.ico" // if no image, then use "" and ItemCard will handle it
                  />
                </div>
              </center>
            ))}
      </div>
    </div>
  );
}

export default LostItemsPage;
