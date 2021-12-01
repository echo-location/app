import React from "react";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { getItems } from "../utils/utils";

const Map = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [coordItems, setCoordItems] = useState([]); //items with coordinates
  const [users, setUsers] = useState({});
  const center = [-118.4453, 34.071];

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
          newItems.push(item);
          return [long, lat];
        })
        .filter((item) => item.length > 0);

      let dict = {};
      for (let i = 0; i < newItems.length; i++) {
        const data = await findUser(newItems[i].user);
        dict[newItems[i]._id] = data.username;
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

  return (
    <div style={{ background: "red" }}>
      <Map
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/streets-v10"
        containerStyle={{
          height: "37rem",
          width: "100%",
        }}
        center={center}
        zoom={[14.5]}
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
              >
                <center>
                  <h3 style={{ color: "blue" }}>{item.name}</h3>
                  {item.location}
                  <br />
                  {item.description === "" ? "" : "Info: " + item.description}
                  <br />
                  {users[item._id] === undefined
                    ? ""
                    : "User-" + users[item._id]}
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

export default Map;
