import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../App.css'
import icon from './images/ad.jpg'
// Fix for default marker icon issue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const MyMap = (props) => {
    const [params,  setParams] = React.useState({city:'', media:''})
    useEffect(()=>{
      const query = new URLSearchParams(window.location.search)
      setParams({'city':query.get('city'), 'media':query.get('mediaType')})
    },[])

  // const myMarker = new L.Icon({
  //   iconUrl: icon,
  //   iconSize: [32,32],
  //   iconAnchor: [16,32],
  //   popupAnchor: [1,-24],
  // })
  // const {location, cordinates} = props
  const cordinates = [22.99180142158226, 72.4865308522456]
  const location = 'Ahmedabad'
  return (
    <MapContainer
      center={cordinates}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '50vh', width: '100%' }}
      
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={cordinates}>
        <Popup>
          <div className='d-grid  gap-2'>

            <div>
          <img src={icon} width={'100%'}/>

          </div>
            <div>
            <b> {params.city} </b>
            <p>
            {params.media}
            </p> 

            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
