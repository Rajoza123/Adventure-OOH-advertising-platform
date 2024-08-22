import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../App.css'

// Fix for default marker icon issue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const MyMap = (props) => {

  
  // const {location, cordinates} = props
  const cordinates = [22.99180142158226, 72.4865308522456]
  const location = 'Ahmedabad'
  return (
    <MapContainer
      center={cordinates}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '50vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={cordinates}>
        <Popup>
          {location}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
