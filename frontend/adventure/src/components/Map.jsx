import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link, useNavigate } from 'react-router-dom';
import L from 'leaflet';
import '../App.css'
import icon from './images/ad.jpg'

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import axios from 'axios';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const MyMap = (props) => {
  // const [params,  setParams] = React.useState({city:'', media:''})
  // useEffect(()=>{
  //   const query = new URLSearchParams(window.location.search)
  //   setParams({'city':query.get('city'), 'media':query.get('mediaType')})
  // },[])

  // const myMarker = new L.Icon({
  //   iconUrl: icon,
  //   iconSize: [32,32],
  //   iconAnchor: [16,32],
  //   popupAnchor: [1,-24],
  // })
  // const {location, cordinates} = props
  const cordinates = [22.99180142158226, 72.4865308522456]
  const location = 'Ahmedabad'
  const [markers, setMarkers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/billboard/').then((res) => {
      setMarkers(res.data)
      // console.log(markers)
    }).catch((e) => {
      console.log(e)
    })
  }, [])

  const handleRedirect = (id)=>{
    if(localStorage.getItem("is_authenticated")){
      if(!localStorage.getItem("company_id")){
        alert("Login as a company to book the billboard.")
      }else{
        window.location.assign("/book/"+id)
      }
    }else{
      alert("Login To Access This Functionality")
    }
  }

  return (
    <MapContainer
      center={cordinates}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100%' }}

    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {
        markers.map((marker, index) => {
          // console.log(marker.coordinates)
          // let lat = marker.cordinates.split(',')[0]
          // let lon = marker.cordinates.split(',')[1]
          // console.log(lat, lon)
          return (
            <Marker position={[marker.lat, marker.lng]} key={index} >
              <Popup>
                <div className='d-grid  gap-2'>

                  <div>
                    <img src={'http://127.0.0.1:8000' + marker.image} width={'100%'} />
                  </div>
                  <div>
                    <b> {marker.publisher.name} </b>
                    <p>
                      <p> <b> Type : </b>{marker.type.name} </p>
                    </p>
                    <p> <b> Price :</b> ₹ {marker.price} </p>
                    <button onClick={()=>handleRedirect(marker.id)} className="btn btn-dark" >Book</button>
                  </div>
                </div>
              </Popup>
              
            </Marker>
          )
        })

      }


    </MapContainer>

  );
};

export default MyMap;
