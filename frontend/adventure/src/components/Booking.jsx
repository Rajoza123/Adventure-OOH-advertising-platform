import React, { useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './Booking.css'; // Custom CSS for layout and styling
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

export const Booking = (id) => {
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

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Price:', price);
    console.log('File:', file);
    // You can handle the form data submission here (e.g., send to the server)
  }

  useEffect(() => {
    api = "http://127.0.0.1:8000/billboard/" + id + "/"
    axios.get(api)
  }, [])

  return (
    <div className="booking-container">
      <MapContainer
        center={cordinates}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '65vh', width: '100%' }}

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
                      <button className="btn btn-dark" onClick={handleClick}>Book</button>
                    </div>
                  </div>
                </Popup>

              </Marker>
            )
          })

        }


      </MapContainer>
      <div className="date-picker">
        <DateRangePicker
          ranges={[selectionRange]}
          onChange={handleSelect}
        />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={handlePriceChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">Upload File:</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
