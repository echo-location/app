import React, { useState, useEffect } from "react";
import "../App.css";
import Bar from "../components/Bar/Bar";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getItems } from "../utils/utils";
import SearchBar from "./SearchBar/SearchBar";

const ItemCard = ({
  username,
  item,
  location,
  contactInfo,
  image,
  description,
  dateFound,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar src={image}>{item.charAt(0)}</Avatar>}
        title={`${username} - ${item}`}
        subheader={`Found at ${location} | \n Contact: ${contactInfo}`}
      />
      <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>

        <ExpandMore expand={expanded} onClick={() => setExpanded(!expanded)}>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CardMediaImageWrapper>
            <CardMedia component="img" image={image} alt={item} />
          </CardMediaImageWrapper>
          <p>More Info: </p>
          <p>{description}</p>
          <p>{dateFound}</p>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const LostItems = () => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState({});

  const findUser = async (id) => {
    try {
      return fetch(`http://localhost:8000/user/${id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => data.user[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const response = await getItems();
      const newItems = response["items"];

      let dict = {};
      for (let i = 0; i < newItems.length; i++) {
        const data = await findUser(newItems[i].user);
        dict[newItems[i]._id] = data;
      }
      setItems(response["items"]);
      setUsers(dict);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div>
      <Bar />

      <div className="Items">
        <h1>Lost Items</h1>
        <center>
          <SearchBar setItems={setItems} />
        </center>
        {items.map(({ _id, name, location, description, date }) => (
          <center>
            <div>
              <br />
              <ItemCard
                username={users[_id] === undefined ? " " : users[_id].username}
                item={name}
                location={location}
                contactInfo="example@ucla.edu | 123-456-7890" // TODO
                description={description}
                dateFound={`Found: ${date.substring(0, 10)}`}
                image="" // if no image, then use "" and ItemCard will handle it
              />
            </div>
          </center>
        ))}
      </div>
    </div>
  );
};

// styling
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

export default LostItems;
