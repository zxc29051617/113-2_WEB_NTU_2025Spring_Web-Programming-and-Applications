import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import React, { useState } from "react";

const MapPage = () => {
  const ntuPosition = { lat: 25.0173412, lng: 121.5397495 };
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh" }}>
        <Map 
          defaultZoom={15}
          defaultCenter={ntuPosition}
          disableDefaultUI={true}
          mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
        ></Map>
      </div>
    </APIProvider>
  );
};

export default MapPage;