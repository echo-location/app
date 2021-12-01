import React from "react";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { getItems } from "../utils/utils";

const Map = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [center, setCenter] = useState([34.0709543, -73.4542037]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const items = await getItems();

      const coords = items.items
        .map((item) => {
          console.log(item);
          const c = item.meta.coordinates;
          if (c.length === 0) return [];
          const [lat, long] = c;
          return [long, lat];
        })
        .filter((item) => item.length > 0);

      let newCenter = [0.0, 0.0];
      coords.map((coord) => {
        console.log(coord);
        const [lat, long] = coord;
        newCenter[0] += lat;
        newCenter[1] += long;
        return null;
      });

      setCenter([newCenter[0] / coords.length, newCenter[1] / coords.length]);
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
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        center={center}
        containerStyle={{
          height: "37rem",
          width: "100%",
        }}
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
