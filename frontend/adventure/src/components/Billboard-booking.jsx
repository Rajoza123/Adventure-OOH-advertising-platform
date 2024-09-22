import { DateRangePicker } from 'react-date-range';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Card, Carousel, Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap styles
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './Booking.css';
import axios from 'axios';


export default function BillboardBooking() {
  const { id } = useParams();
  const [dateRange, setDateRange] = useState("");
  const [image, setImage] = useState(null);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);

  function handleSelect(ranges) {
    setSelectionRange({
      ...selectionRange,
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  }

  function handlePriceChange(e) {
    setPrice(e.target.value);
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }
  const [coordinates,setCoordinates] = useState({lat:23.037547757260782,lng:72.55952939994147})
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log('Price:', price);
  //   console.log('File:', file);
  //   // You can handle the form data submission here (e.g., send to the server)
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Date Range:", dateRange);
    console.log("Price:", price);
    console.log("Image:", image);
  };
  const [billboard,setBillboard] = useState({}) 
  useEffect(()=>{
    // console.log(id)
    const api = "http://127.0.0.1:8000/billboard/" + id + "/"
    axios.get(api).then((res)=>{
      setBillboard(res.data)
      setCoordinates({lat:billboard.lat,lng:billboard.lng})
    }).catch(()=>{
      console.log("Error")
    })
  },[])

  return (
    <div className="container mx-auto p-4">
      <div className="row">
        <div className="col-md-6 mb-4">
          <Card>
            <Card.Header>
              <Card.Title>Billboard Details</Card.Title>
            </Card.Header>
            <Card.Body>
              <Carousel>
                {[1, 2, 3].map((index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={`/placeholder.svg?height=200&width=400&text=Billboard+Image+${index}`}
                      alt={`Billboard ${index}`}
                      className="w-100 h-48 object-cover"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <h2 className="text-xl font-bold mt-4">{billboard.area}</h2>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6 mb-4">
          <Card>
            <Card.Header>
              <Card.Title>Location</Card.Title>
            </Card.Header>
            <Card.Body>
              <div style={{ height: "400px", width: "100%" }}>
                {billboard && <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[51.505, -0.09]}>
                    <Popup>Billboard Location</Popup>
                  </Marker>
                </MapContainer>}
                
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <Card className="mt-4">
        <Card.Header>
          <Card.Title>Book Billboard</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="date-picker">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
            />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                className="form-control"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload Image</label>
              <input
                id="image"
                type="file"
                className="form-control"
                onChange={(e) => setImage(e.target.files || null)}
              />
            </div>
            <Button type="submit">Submit Booking</Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
