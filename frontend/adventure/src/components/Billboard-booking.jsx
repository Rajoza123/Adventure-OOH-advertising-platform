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

  // Initial states

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const isAuthorized = localStorage.getItem("is_authenticated")
  const [price, setPrice] = useState(0); // Ensure price is controlled
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [billboard, setBillboard] = useState({});
  const sessionid = window.localStorage.getItem("company_id");

  // Handle date range selection
  function handleSelect(ranges) {
    setSelectionRange({
      ...selectionRange,
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });

    setPrice(() => {
      const start = ranges.selection.startDate.getTime();
      const end = ranges.selection.endDate.getTime();
      const duration = (end - start) / (1000 * 60 * 60 * 24);
      const price = (duration + 1) * billboard.price;
      return price || 0; 
    });
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if(isAuthorized){
      if(!localStorage.getItem("company_id")){
        alert("Login as a company to book the billboard.")
      }
      const formData = new FormData();
      const fields = document.forms["book"];
  
      formData.append("billboard_id", fields.id.value);
      formData.append("price", fields.price.value);
      formData.append("start_date", selectionRange.startDate.toISOString().slice(0, 10));
      formData.append("end_date", selectionRange.endDate.toISOString().slice(0, 10));
      formData.append('file',fields.file.files[0])
  
      axios.post("http://127.0.0.1:8000/billxcomp/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('token'),
        },
      }).then((res) => {
        console.log(res.data);
        if(res.data.id)
          window.alert("Request has been successfully registered.")
          window.location.assign("/company/billboard")
      }).catch((er)=>{
        alert(er);
      })
    }
    else{
      alert("Please Login to book the billboard.")
    }
  };

  function renderStaticRangeLabel(range) {
    return <span>{range.label}</span>;
  }

  // Fetch billboard details
  useEffect(() => {
    const api = `http://127.0.0.1:8000/billboard/${id}/`;
    axios.get(api)
      .then((res) => {
        setBillboard(res.data);
        setCoordinates({ lat: parseFloat(res.data.lat), lng: parseFloat(res.data.lng) });
      })
      .catch(() => {
        console.log("Error fetching billboard data");
      });
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <div className="row">
        {/* Billboard Details */}
        <div className="col-md-6 mb-4">
          <Card>
            <Card.Header>
              <Card.Title>Billboard Details</Card.Title>
            </Card.Header>
            <Card.Body>
              <Carousel>
                {[1, 2, 3].map((index) => (
                  <Carousel.Item key={index} >
                    
                    <img
                      src={`http://127.0.0.1:8000/${billboard.image}`}
                      width={"218px"}
                      alt={`Billboard ${index}`}
                      className=" object-cover"
                      style={{margin:"auto", display:"block"}}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <br />
              <p>price: {billboard.price}</p>
              <p>locality: {billboard.locality}</p>
              <p>area: {billboard.area}</p>
              <p>Size: {billboard.width} × {billboard.height}</p>
            </Card.Body>
          </Card>
        </div>

        {/* Billboard Location Map */}
        <div className="col-md-6 mb-4">
          <Card>
            <Card.Header>
              <Card.Title>Location</Card.Title>
            </Card.Header>
            <Card.Body>
              <div style={{ height: "400px", width: "100%" }}>
                {billboard && (
                  <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={13} style={{ height: "100%", width: "100%" }} key={`${coordinates.lat}-${coordinates.lng}`} >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[coordinates.lat, coordinates.lng]}>
                      <Popup>Billboard Location</Popup>
                    </Marker>
                  </MapContainer>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Booking Form */}
      <Card className="mt-4">
        <Card.Header>
          <Card.Title>Book Billboard</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="date-picker">
            <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} minDate={new Date()} disabledDates={billboard.disabled_dates} renderStaticRangeLabel={renderStaticRangeLabel} />
            <style>{`
              .rdrDefinedRangesWrapper {
                display: none;
              }
            `}</style>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" name='book'>
            <input type="hidden" name="id" value={billboard.id || ''} />
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input id="price" type="number" className="form-control" name="price" value={price} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload File</label>
              <input id="file" name='file' type="file" className="form-control" />
            </div>
            <Button type="submit">Submit Booking</Button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
