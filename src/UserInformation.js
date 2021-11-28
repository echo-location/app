import React, { useState, useEffect } from 'react';
import { styled } from "@mui/material/styles";
import BarDrawer from "./BarDrawer";
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
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

//removes an item from the database
function remove(id){
  console.log("remove", id)
  if (window.confirm("Are you sure you want to remove this item?"))
  {
    const url = "https://echolocation-api.herokuapp.com/";
    const response = fetch(`${url}/item/${id}`, {
      method: "DELETE",
    });
    console.log(response);
  } 
}
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
  const { username, item, location, contactInfo, image, moreInfo, itemid } = props;
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
          <IconButton aria-label = "remove" onClick = {() => remove(itemid //will need to take in some set of params in future
            )}>
            <DeleteIcon />
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

const getUser = async () => {
    var para = new URLSearchParams(window.location.search);
    var pass = para.get("User"); 
    const url = "https://echolocation-api.herokuapp.com/";
    const response = await fetch(`${url}:${pass}`, {
      method: "GET",
    });
    console.log(response);
    return response.json();
  };

function UserInformation(){
    const [user, setUsers] = useState([]);
  useEffect(() => {
    getUser().then((response) => {
      setUsers(response["users"]);
      console.log(response["users"]);
    });
  }, []);

    return(
        <div className = "UserInformationPage">
            <BarDrawer />
            <h1>Items You have Reported</h1>
                <center>
                  {//will need to map items here
}
                  <div>
                    <br />
                    <ItemCard
                      username={user}
                      //item={item} //item.name?
                      item={"Airpods"}
                      location={"De Neve"} //item.location
                      contactInfo="example@ucla.edu | 123-456-7890"
                      moreInfo="I found this item on the back right side of the building 100 on Monday 11/13 in my class between 10-11am."
                      image="favicon.ico" // if no image, then use "" and ItemCard will handle it
                      itemid = {1245232}
                    />
                  </div>
                </center>
              </div>
    )
}

export default UserInformation