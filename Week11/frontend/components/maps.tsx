"use client";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import React from "react";

const Maps: React.FC = () => {
  const ntuPosition = { lat: 25.0173412, lng: 121.5397495 };

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  // const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID;

  if (!apiKey) {
    throw new Error("Google Maps API Key is missing. Please check .env.local");
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: "100vh" }} className="rounded-lg">
        <Map
          defaultZoom={15}
          defaultCenter={ntuPosition}
          disableDefaultUI={true}
          // mapId={mapId}
        />
      </div>
    </APIProvider>
  );
};

export default Maps;
