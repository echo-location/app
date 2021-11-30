import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1Ijoic3dlZW5leW5nbyIsImEiOiJja3dsb25jbzQyM3I1MnBwd2RtemFldWhpIn0.VTSZL-ecZvL5SK7S1uL9iw",
  });

  return (
    <div style={{ background: "red" }}>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "30rem",
          width: "100%",
        }}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
    </div>
  );
};

export default Map;
