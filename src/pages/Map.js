import React from "react";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { getItems } from "../utils/utils";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

const Map = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [coordItems, setCoordItems] = useState([]); //items with coordinates
  const [users, setUsers] = useState({});
  const center = [-118.4453, 34.071];
  const mapStyle = "mapbox://styles/mapbox/streets-v11";
  const mapZoom = [15];
  const mapPitch = [85];
  const mapBearing = [49];

  const [contactUser, setContactUser] = useState("1(800)123-TEST");
  const [popupItem, setPopupItem] = useState("");
  const [popupLoc, setPopupLoc] = useState("");
  const [displayBool, setDisplayBool] = useState(false);

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
    const fetchCoordinates = async () => {
      const items = await getItems();

      let newItems = [];

      const coords = items.items
        .map((item) => {
          //console.log(item);
          const c = item.meta.coordinates;
          if (c.length === 0) return [];
          const [lat, long] = c;
          newItems.push(item); //only get items with coordinates
          return [long, lat];
        })
        .filter((item) => item.length > 0);

      let dict = {};
      for (let i = 0; i < newItems.length; i++) {
        const data = await findUser(newItems[i].user);
        dict[newItems[i]._id] = data;
      }
      setUsers(dict);
      setCoordinates(coords);
      setCoordItems(newItems);
    };
    fetchCoordinates();
  }, []);

  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1Ijoic3dlZW5leW5nbyIsImEiOiJja3dsb25jbzQyM3I1MnBwd2RtemFldWhpIn0.VTSZL-ecZvL5SK7S1uL9iw",
  });

  if (displayBool) {
    return (
      <div style={{ height: "100%", border: "2px solid blue" }}>
        <AlertDialog
          contactUser={contactUser}
          location={popupLoc}
          item={popupItem}
        />
        <Map
          // eslint-disable-next-line
          style={mapStyle}
          containerStyle={{
            height: "100%",
            width: "100%",
          }}
          center={center}
          zoom={mapZoom}
          pitch={mapPitch}
          bearing={mapBearing}
        >
          {coordinates.length > 0 && (
            <>
              <Layer
                type="symbol"
                id="marker"
                layout={{ "icon-image": "suitcase-11" }}
              >
                {coordinates.map((coord) => (
                  <Feature coordinates={coord} />
                ))}
              </Layer>

              {coordItems.map((item) => (
                <Popup
                  coordinates={[
                    item.meta.coordinates[1],
                    item.meta.coordinates[0],
                  ]}
                  style={{ opacity: 0.8 }}
                  onMouseEnter={() => {}} // set opacity to 0.9 or 1
                  onMouseLeave={() => console.log("t")} //set opacity back to 0.7
                >
                  <center>
                    <h3 style={{ color: "blue" }}>{item.name}</h3>
                    <i>{item.location}</i>
                    <br />
                    {item.description === "" ? "" : "Info: " + item.description}
                    <br />
                    <b>
                      {users[item._id] === undefined
                        ? ""
                        : "User: " + users[item._id].username}
                    </b>
                    <br />
                    <img
                      src={item.photo}
                      height="50px"
                      width="50px"
                      alt=""
                    ></img>
                  </center>
                </Popup>
              ))}
            </>
          )}
        </Map>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", border: "2px solid blue" }}>
      <Map
        // eslint-disable-next-line
        style={mapStyle}
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
        center={center}
        zoom={mapZoom}
        pitch={mapPitch}
        bearing={mapBearing}
      >
        {coordinates.length > 0 && (
          <>
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "suitcase-11" }}
            >
              {coordinates.map((coord) => (
                <Feature coordinates={coord} />
              ))}
            </Layer>

            {coordItems.map((item) => (
              <Popup
                coordinates={[
                  item.meta.coordinates[1],
                  item.meta.coordinates[0],
                ]}
                style={{ opacity: 0.7 }}
                onMouseEnter={() => {}} // set opacity to 0.9 or 1
                onMouseLeave={() => console.log("t")} //set opacity back to 0.7
                onClick={() => {
                  setDisplayBool(true);
                  setContactUser(users[item._id]);
                  setPopupItem(item.name);
                  setPopupLoc(item.location);
                }}
              >
                <center>
                  <h3 style={{ color: "blue" }}>{item.name}</h3>
                  <i>{item.location}</i>
                  <br />
                  {item.description === "" ? "" : "Info: " + item.description}
                  <br />
                  <b>
                    {users[item._id] === undefined
                      ? ""
                      : "User: " + users[item._id].username}
                  </b>
                  <br />
                  <img src={item.photo} height="50px" width="50px" alt=""></img>
                </center>
              </Popup>
            ))}
          </>
        )}
      </Map>
    </div>
  );
};

function AlertDialog({ contactUser, location, item = "airpods"}) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Button
            color="secondary"
            variant="contained"
            startIcon={<ContactPhoneIcon />}
            style={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
            }}
            size="large"
          >
            Contact {contactUser.username}
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contactUser.email === "" ? "No email given" : contactUser.email}
            <br />
            {contactUser.phone === "" ? "No # given" : contactUser.phone}
            <br />
            Item: {item}
            <br/>
            {location}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Map;
