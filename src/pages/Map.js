import React from "react";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { getItems } from "../utils/utils";

const Map = () => {
  const [coordinates, setCoordinates] = useState([]);
  const center = [-118.4453, 34.071];

  useEffect(() => {
    const fetchCoordinates = async () => {
      const items = await getItems();

      const coords = items.items
        .map((item) => {
          console.log(item);
          const c = item.meta.coordinates;
          const itemName = item.name;
          if (c.length == 0) return [];
          const [lat, long] = c;
          return [long, lat];
        })
        .filter((item) => item.length > 0);

      let newCenter = [0.0, 0.0];
      coords.map((coord) => {
        if (coord.length === 2) {
          console.log(coord);
          const [lat, long] = coord;
          newCenter[0] += lat;
          newCenter[1] += long;
        }
      });

      setCoordinates(coords);
    };
    fetchCoordinates();
  }, []);

  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1Ijoic3dlZW5leW5nbyIsImEiOiJja3dsb25jbzQyM3I1MnBwd2RtemFldWhpIn0.VTSZL-ecZvL5SK7S1uL9iw",
  });

  return (
    <div style={{ background: "red" }}>
      {/* eslint-disable-next-line */}
      <Map
        style="mapbox://styles/mapbox/streets-v9"
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
              layout={{ "icon-image": "harbor-15" }}
            >
              {coordinates.map((coord) => (
                <Feature coordinates={coord} />
              ))}
            </Layer>

            {coordinates.map((coord) => (
              <Popup coordinates={coord}>
                <h1>Popup</h1>
              </Popup>
            ))}
          </>
        )}
      </Map>
    </div>
  );
};

export default Map;
