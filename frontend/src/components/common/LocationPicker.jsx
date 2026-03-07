import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const LocationPicker = ({ initialPosition, onLocationSelect }) => {
  const [position, setPosition] = useState(initialPosition || { lat: 9.03, lng: 38.74 }); // Default to Addis Ababa

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  const handleSetPosition = (pos) => {
    setPosition(pos);
    if (onLocationSelect) {
      onLocationSelect(pos);
    }
  };

  return (
    <div className="h-[300px] w-full rounded-xl overflow-hidden border border-slate-200 shadow-inner">
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={handleSetPosition} />
      </MapContainer>
      <div className="bg-slate-50 p-2 text-[10px] text-slate-500 font-medium flex justify-between items-center px-4">
        <span>Click on the map to set location</span>
        {position && (
          <span>Lat: {position.lat.toFixed(4)}, Lng: {position.lng.toFixed(4)}</span>
        )}
      </div>
    </div>
  );
};

export default LocationPicker;
