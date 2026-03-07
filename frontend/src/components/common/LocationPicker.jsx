import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import axios from 'axios';

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 16);
    }
  }, [center, map]);
  return null;
};

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
  const [addressSearch, setAddressSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (initialPosition && (initialPosition.lat !== position.lat || initialPosition.lng !== position.lng)) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  // Debounced search logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (addressSearch && addressSearch.length > 2) {
        handleSearch(addressSearch);
      } else {
        setSuggestions([]);
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [addressSearch]);

  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      // Nominatim API with Ethiopia focus (countrycodes=et)
      // Viewbox provides a rough boundary for Ethiopia
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: query,
          format: 'json',
          limit: 5,
          addressdetails: 1,
          countrycodes: 'et',
          viewbox: '32.9,3.4,47.9,14.8',
          bounded: 1
        }
      });
      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Geocoding error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    const newPos = { 
      lat: parseFloat(suggestion.lat), 
      lng: parseFloat(suggestion.lon) 
    };
    setPosition(newPos);
    setAddressSearch(suggestion.display_name);
    setShowSuggestions(false);
    if (onLocationSelect) {
      onLocationSelect(newPos);
    }
  };

  const handleSetPositionByClick = (pos) => {
    setPosition(pos);
    if (onLocationSelect) {
      onLocationSelect({ lat: pos.lat, lng: pos.lng });
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
        </div>
        <input 
          type="text"
          placeholder="Search for an area, street or landmark in Ethiopia..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          value={addressSearch}
          onChange={(e) => setAddressSearch(e.target.value)}
          onFocus={() => setShowSuggestions(suggestions.length > 0)}
        />
        {addressSearch && (
          <button 
            type="button"
            onClick={() => {
              setAddressSearch('');
              setSuggestions([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-[1001] left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {suggestions.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-start gap-3 border-b border-slate-50 last:border-0"
              >
                <div className="bg-blue-50 p-1.5 rounded-lg text-blue-600 mt-0.5">
                  <MapPin size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 line-clamp-1">{item.display_name}</span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    {item.type.replace('_', ' ')}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-[300px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
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
          <LocationMarker position={position} setPosition={handleSetPositionByClick} />
          <ChangeView center={position} />
        </MapContainer>
        
        {/* Overlay for map interaction info */}
        <div className="absolute top-4 right-4 z-[1000]">
           <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm pointer-events-none">
              <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
                 Click map to refine
              </p>
           </div>
        </div>
      </div>

      <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
           <MapPin size={12} className="text-slate-400" />
           <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Selected Coordinates</span>
        </div>
        {position?.lat != null && position?.lng != null && (
          <div className="flex gap-4">
             <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-black text-slate-400 uppercase">Lat</span>
                <span className="text-xs font-black text-slate-900 italic font-mono">{Number(position.lat).toFixed(6)}</span>
             </div>
             <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-black text-slate-400 uppercase">Lng</span>
                <span className="text-xs font-black text-slate-900 italic font-mono">{Number(position.lng).toFixed(6)}</span>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPicker;
