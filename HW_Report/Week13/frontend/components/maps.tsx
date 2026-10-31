"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import { StoreDialog } from "@/components/store-dialog";

interface CafePosition {
  id: number;
  lat: number;
  lng: number;
  name: string;
  address?: string;
  phone?: string;
  hours?: string;
  policies?: string[];
  paymentMethods?: string[];
  facilities?: string[];
  imageUrl?: string;
}

interface MapsProps {
  cafes?: CafePosition[];
}

const Maps: React.FC<MapsProps> = ({ cafes = [] }) => {
  const ntuPosition = { lat: 25.0173412, lng: 121.5397495 };
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<CafePosition | null>(null);

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
        >
          {cafes.map((cafe) => (
            <Marker
              key={cafe.id}
              position={{ lat: cafe.lat, lng: cafe.lng }}
              title={cafe.name}
              onClick={() => {
                setSelectedCafe(cafe);
                setDialogOpen(true);
              }}
            />
          ))}
        </Map>
        {selectedCafe && (
          <StoreDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            cafe={selectedCafe}
          />
        )}
      </div>
    </APIProvider>
  );
};

export default Maps;
