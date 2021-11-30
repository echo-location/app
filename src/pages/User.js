import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getItems } from "../utils/utils";
import ItemCard from "../components/ItemCard/ItemCard";

//removes an item from the database
// const CardMediaImageWrapper = styled("div")(() => ({
//   maxHeight: "50%",
//   maxWidth: "50%",
// }));

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// function ItemCard(props) {
//   const { username, item, location, contactInfo, image, moreInfo, itemid } =
//     props;
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardHeader
//         avatar={
//           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={image}>
//             {" "}
//             {/* MAKE ICON A SMALL IMAGE OF THE PICTURE IF IT EXISTS, OTHERWISE FIRST LETTER OF ITEM OR USER*/}
//             {item.charAt(0)}
//           </Avatar>
//         }
//         action={
//           <IconButton
//             aria-label="remove"
//             onClick={() =>
//               remove(
//                 itemid //will need to take in some set of params in future
//               )
//             }
//           >
//             <DeleteIcon />
//           </IconButton>
//         }
//         title={`${username} - ${item}`}
//         subheader={`Found at ${location} | \n Contact: ${contactInfo}`}
//       />
//       {/* <CardMedia component="img" image="favicon.ico" height = "50" width = "50" alt={item} /> */}
//       {/* <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           This impressive paella is a perfect party dish and a fun meal to cook
//           together with your guests. Add 1 cup of frozen peas along with the
//           mussels, if you like.
//         </Typography>
//       </CardContent> */}
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>

//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="More Info"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <CardMediaImageWrapper>
//             <CardMedia component="img" image={image} alt={item} />
//           </CardMediaImageWrapper>
//           <Typography paragraph>More Info: </Typography>
//           <Typography paragraph>{moreInfo}</Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// }

function UserInformation() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState({});

  const remove = (id) => {
    console.log("remove", id);
    if (window.confirm("Are you sure you want to remove this item?")) {
      const url = "http://localhost:8000";
      const response = fetch(`${url}/item/${id}`, {
        method: "DELETE",
      }).then((response) => {
        console.log(response);
        console.log("Hooray!");
      });
    }
  };

  const findUser = async (id) => {
    try {
      return fetch(`http://localhost:8000/user/${id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const userQuery = new URLSearchParams(window.location.search).get("User");
      const getUser = async (item, query) => {
        const user = await findUser(item.user);
        return user.user[0].username === query;
      };

      const fetchByUser = async () => {
        const response = await getItems();
        const results = await Promise.all(
          response["items"].map((item) => getUser(item, userQuery))
        );
        return response["items"].filter((_v, index) => results[index]);
      };

      const newItems = await fetchByUser();
      let dict = {};
      for (let i = 0; i < newItems.length; i++) {
        const user = await findUser(newItems[0].user);
        dict[newItems[i]._id] = user.user[0];
      }

      setItems(newItems);
      setUsers(dict);
    };
    fetchItems();
  }, []);

  return (
    <div className="UserInformationPage">
      <h1>Items You have Reported</h1>
      {items.map(({ _id, name, location, description, date, photo }) => (
        <center>
          <div>
            <ItemCard
              username={users[_id] === undefined ? " " : users[_id].username}
              item={name}
              location={location}
              contactInfo={
                users[_id] === undefined
                  ? ""
                  : `${users[_id].email} | ${users[_id].phone} `
              }
              description={description}
              dateFound={`Found: ${new Date(date).toLocaleDateString([], {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}`}
              image={photo}
              userId={users[_id] === undefined ? "" : users[_id].username}
              itemId={_id}
            />
            <div
              onClick={() => remove(_id)}
              style={{ width: "200px", background: "red" }}
            >
              DELETE
            </div>
          </div>
        </center>
      ))}
    </div>
  );
}

export default UserInformation;
