"use client";

import GoogleMap from "google-maps-react-markers";
import { useRef, useState } from "react";

const Marker = ({
  lat,
  lng,
  markerId,
  onClick,
}: {
  lat: number;
  lng: number;
  markerId: string;
  onClick: (e: React.MouseEvent, data: { markerId: string; lat: number; lng: number }) => void;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        backgroundColor: "red",
        color: "white",
        padding: "5px",
        borderRadius: "50%",
        cursor: "pointer",
      }}
      onClick={(e) => onClick(e, { markerId, lat, lng })}
    >
      {markerId}
    </div>
  );
};

const App = () => {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   * @param {Object} maps - reference to the maps library
   */
  const onGoogleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    mapRef.current = map;
    setMapReady(true);
  };

  const onMarkerClick = (e: React.MouseEvent, { markerId, lat, lng }: { markerId: string; lat: number; lng: number }) => {
    console.log("This is ->", markerId);

    // Use the map instance to center the clicked marker
    mapRef.current.setCenter({ lat, lng });
  };

  const coordinates = [
    { lat: 45.4046987, lng: 12, name: "Nathan" },
    { lat: 45.4146987, lng: 12.2572504, name: "venessa" },
    { lat: 45.4246987, lng: 12.2672504, name: "Gen" },
  ];

  return (
    <>
      {mapReady && (
        <div className="p-2 bg-green-100 text-green-800">
          Map is ready. Check logs in the developer console.
        </div>
      )}
      <GoogleMap
        apiKey="AIzaSyBAcBXh89zPhhf_aLOcjU0xpt3t2dCP7Go"
        defaultCenter={{ lat: 45.4046987, lng: 12.2472504 }}
        defaultZoom={5}
        mapMinHeight="100vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={(map) => console.log("Map moved", map)}
      >
        {coordinates.map(({ lat, lng, name }, index) => (
          <Marker
            key={index}
            lat={lat}
            lng={lng}
            markerId={name}
            onClick={onMarkerClick} // Call on marker click
          />
        ))}
      </GoogleMap>
    </>
  );
};

export default App;
